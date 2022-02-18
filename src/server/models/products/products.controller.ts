import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/createProducts.dto';
import { UpdateProductsDto } from './dto/updateProducts.dto';
import { SerializedProduct } from './serializers/products.serializer';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get(':id')
  async getProduct(@Param() { id }: { id: string }) {
    return this.productsService.getById(id);
  }

  @Get()
  async getAllProducts() {
    return this.productsService.getAll();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductsDto) {
    return this.productsService.create(createProductDto);
  }

  @Post()
  async update(@Body() updateProductDto: UpdateProductsDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }
}
