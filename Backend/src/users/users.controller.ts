import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './users.service';
import { ProductDto } from './dto/user.dto';
import { Product } from './entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() productDto: ProductDto): Promise<Product> {
    return this.productsService.create(productDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.productsService.deleteuser(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() productDto: ProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, productDto);
  }
}
