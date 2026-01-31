import { IsString, IsNumber, Min, IsInt } from 'class-validator';

export class CreateProductLinkDto {
  @IsInt()
  @Min(0)
  productId: number;

  @IsString()
  url: string;

  @IsString()
  platform: string;

  @IsString()
  label: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
