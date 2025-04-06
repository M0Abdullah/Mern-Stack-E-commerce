import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/user.entity';
import { ProductDto } from './dto/user.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(productDto: ProductDto): Promise<Product> {
    const product = this.productRepository.create(productDto);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
    });
  }
  async deleteuser(id: number): Promise<void> {
    const data = await this.productRepository.delete(id);
    if (data.affected === 0) {
      throw new Error('User not found');
    }
  }
  async update(id: number, productDto: ProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    Object.assign(product, productDto);

    return this.productRepository.save(product);
  }
}
