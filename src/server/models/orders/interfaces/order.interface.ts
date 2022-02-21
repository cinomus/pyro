import { IUser } from '../../users/interfaces/user.interface';
import { IProduct } from '../../products/interfaces/product.interface';
import { OrderStatusInterface } from './orderStatus.interface';

export interface IOrder {
  id: string;
  user: IUser;
  products: IProduct[];
  address: string;
  status: string;
}
