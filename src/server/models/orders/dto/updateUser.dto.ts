import { IUser } from '../../users/interfaces/user.interface';
import { IProduct } from '../../products/interfaces/product.interface';

export interface UpdateUserDto {
  id: string;
  user?: IUser;
  products?: IProduct[];
  address?: string;
  status?: string;
}
