import { EntityRepository } from 'typeorm';
import { ModelRepository } from '../../model.repository';
import { Product } from '../entities/products.entity';
import { SerializedProduct } from '../serializers/products.serializer';

@EntityRepository()
export class ProductsRepository extends ModelRepository<Product> {}
