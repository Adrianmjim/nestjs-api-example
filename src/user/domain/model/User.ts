import { BaseEntity } from '../../../common/domain/model/BaseEntity';

export interface User extends BaseEntity {
  age: number;
  email: string;
  name: string;
  surname: string;
}
