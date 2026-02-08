import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AD } from '../admin.const';
import { LoginDto } from './dto/loginDto';
import { AuthService } from 'src/domains/auth/auth.service';
import { RefreshDto } from './dto/refreshDto';

@Controller(`${AD}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() dto: LoginDto) {
    try {
      const tokens = await this.authService.login(dto);
      return tokens;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Ошибка авторизации');
    }
  }

  @Post('refresh')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async refresh(@Body() dto: RefreshDto) {
    try {
      const tokens = await this.authService.refresh(dto.refreshToken);
      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Недействительный refresh-токен');
    }
  }
}
