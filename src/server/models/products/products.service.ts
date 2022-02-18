import { HttpException, Injectable } from '@nestjs/common';
import { ProductsRepository } from './repository/products.repository';
import { CreateProductsDto } from './dto/createProducts.dto';
import { UpdateProductsDto } from './dto/updateProducts.dto';
import { SerializedProduct } from './serializers/products.serializer';
import { Product } from './entities/products.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getById(id: string): Promise<Product> {
    return await this.productsRepository.getById(id);
  }

  async getAll(): Promise<Product[]> {
    return await this.productsRepository.getAll();
  }

  async create(inputs: CreateProductsDto): Promise<Product> {
    return await this.productsRepository.createEntity(inputs);
  }

  async update(id: string, inputs: UpdateProductsDto): Promise<Product> {
    const entity = await this.getById(id);
    if (!entity) throw new HttpException('Wrong Parameter "id"!', 400);

    return await this.productsRepository.updateEntity(entity, inputs);
  }

  async delete(id: string): Promise<DeleteResult> {
    const entity = await this.getById(id);
    if (!entity) throw new HttpException('Wrong Parameter "id"!', 400);

    return await this.productsRepository.removeEntity(entity);
  }
}
