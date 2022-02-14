import { SerializedModel } from '../../../common/serializers/model.serializer';
import { IUser } from '../interfaces/user.interface';
import { Expose } from 'class-transformer';

export const defaultUserGroupsForSerializing: string[] = ['user.timestamps'];
export const extendedUserGroupsForSerializing: string[] = [
  ...defaultUserGroupsForSerializing,
];
export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGroupsForSerializing,
  'user.password',
];

export class SerializedUser extends SerializedModel implements IUser {
  id: string;
  phoneNumber: string;
  name: null | string;
  @Expose({ groups: ['user.password'] })
  password: string;
  @Expose({ groups: ['user.timestamps'] })
  createdAt: Date;
  @Expose({ groups: ['user.timestamps'] })
  updatedAt: Date;
}
