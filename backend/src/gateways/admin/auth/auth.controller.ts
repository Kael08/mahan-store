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
}
