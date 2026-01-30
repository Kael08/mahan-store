import { IsOptional, IsString } from 'class-validator';

export class UpdateBrandDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  logoUrl: string;
}
