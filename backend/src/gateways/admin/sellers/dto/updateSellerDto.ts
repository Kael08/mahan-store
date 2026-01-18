import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  IsEmail,
} from 'class-validator';

export class UpdateSellerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  maxProducts: number;

  @IsNumber()
  priority: number;
}
