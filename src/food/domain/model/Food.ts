import { BaseEntity } from '../../../common/domain/model/BaseEntity';

export interface Food extends BaseEntity {
  amount: number;
  id: string;
  name: string;
  prize: number;
}
