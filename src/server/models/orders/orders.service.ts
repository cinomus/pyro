import { HttpException, Injectable } from '@nestjs/common';
import { OrdersRepository } from './repository/orders.repository';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Order } from './entities/orders.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class OrdersService {
  constructor(private OrdersRepository: OrdersRepository) {}

  async getOne(id: string): Promise<Order> {
    return this.OrdersRepository.getById(id);
  }

  async create(inputs: CreateOrderDto): Promise<Order> {
    // todo: Сделать проверочку на данные

    inputs = { ...inputs, status: 'inProgress' };

    return await this.OrdersRepository.createEntity(inputs);
  }

  async completeOrder(id: string) {
    const order = await this.OrdersRepository.getById(id);
    if (!order)
      throw new HttpException('Error! Order with this id nor found.', 400);

    const inputs: UpdateUserDto = { id, status: 'completed' };

    return this.OrdersRepository.updateEntity(order, inputs);
  }

  async cancelOrder(id: string) {
    const order = await this.OrdersRepository.getById(id);
    if (!order)
      throw new HttpException('Error! Order with this id nor found.', 400);

    const inputs: UpdateUserDto = { id, status: 'completed' };

    return this.OrdersRepository.updateEntity(order, inputs);
  }
}
