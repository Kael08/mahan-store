import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  parentId: number;
}
