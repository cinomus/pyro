import { EntityRepository } from 'typeorm';
import { Order } from '../entities/orders.entity';
import { ModelRepository } from '../../model.repository';

@EntityRepository(Order)
export class OrdersRepository extends ModelRepository<Order> {}
