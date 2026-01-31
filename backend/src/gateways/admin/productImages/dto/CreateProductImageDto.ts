import { IsBoolean, IsNumber, Min, IsPositive } from 'class-validator';

export class CreateProductImageDto {
  @IsBoolean()
  isMain: boolean;

  @IsNumber()
  @Min(0)
  sortOrder: number;

  @IsNumber()
  @IsPositive()
  productId: number;
}
