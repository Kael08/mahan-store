import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from './entities/refreshToken.entity';
import { JwtService } from '@nestjs/jwt';
import { SellersPublicService } from 'src/domains/sellers/public.service';
import { LoginDto } from './dto/loginDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly repo: Repository<RefreshTokenEntity>,
    private readonly sellersPublicService: SellersPublicService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const seller = await this.sellersPublicService.findOneByEmail(dto.email);

    if (!seller) {
      throw new UnauthorizedException('Неверный email или пароль!');
    }

    if (!seller.isActive) {
      throw new UnauthorizedException('Аккаунт отключен!');
    }

    const isValid = await bcrypt.compare(dto.password, seller.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    return await this.generateTokens(seller.id, seller.email);
  }

  private async generateTokens(sellerId: number, email: string) {
    const payload = { sub: sellerId, email };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    await this.saveRefreshToken(sellerId, refreshToken, 7);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async saveRefreshToken(
    sellerId: number,
    token: string,
    expiresInDays: number = 7,
  ) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const refreshToken = this.repo.create({
      sellerId: sellerId,
      token: token,
      expiresAt: expiresAt,
    });

    await this.repo.save(refreshToken);
  }

  async refresh(refreshToken: string) {
    const stored = await this.repo.findOneBy({ token: refreshToken });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Недействительный refresh-токен');
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken);
    } catch {
      throw new UnauthorizedException('Недействительный refresh-токен');
    }

    await this.repo.delete({ token: refreshToken });

    return this.generateTokens(payload.sub, payload.email);
  }
}
