import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum StockStatus {
  IN_STOCK = 'in_stock',
  OUT_OF_STOCK = 'out_of_stock',
  PREORDER = 'preorder',
}

export class CreateProductVariantDto {
  @IsNumber()
  @Min(0, { message: 'ID продукта должен быть положительным числом' })
  productId: number;

  @IsString()
  @MaxLength(50, { message: 'Цвет не должен превышать 50 символов' })
  color: string;

  @IsString()
  @MaxLength(50, { message: 'Размер не должен превышать 50 символов' })
  size: string;

  @IsEnum(StockStatus, {
    message: 'Статус должен быть: in_stock, out_of_stock или preorder',
  })
  stockStatus: StockStatus;

  @ValidateIf((o) => o.price !== null && o.price !== undefined)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Цена должна быть числом с максимум 2 знаками после запятой' },
  )
  @Min(0, { message: 'Цена не может быть отрицательной' })
  @Transform(({ value }) => {
    if (value === null || value === undefined) return value;
    const num = Number(value);
    return isNaN(num) ? value : Number(num.toFixed(2));
  })
  price: number;
}
