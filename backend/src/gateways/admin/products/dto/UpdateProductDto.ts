import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  Min,
  IsBoolean,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  priceMin: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  priceMax: number;

  @IsNumber()
  @IsPositive()
  sellerId: number;

  @IsNumber()
  @IsPositive()
  brandId: number;

  @IsNumber()
  @IsPositive()
  categoryId: number;

  @IsNumber()
  @Min(0)
  priorityBoost: number;

  @IsBoolean()
  isActive: boolean;
}
