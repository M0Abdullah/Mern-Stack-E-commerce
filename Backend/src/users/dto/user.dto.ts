import { IsNumber, IsString, IsObject, IsOptional } from 'class-validator';

export class ProductDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsString()
  image: string;

  @IsObject()
  @IsOptional()
  rating?: {
    rate: number;
    count: number;
  };
}
