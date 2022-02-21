import { IOrder } from '../interfaces/order.interface';
import {
  Column,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Product } from '../../products/entities/products.entity';

export class Order implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
  @Column()
  address: string;
  @Column()
  status: string;
}
