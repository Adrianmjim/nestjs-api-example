import { BaseEntitySortKeyAndOrderType } from '../../../common/domain/model/BaseEntitySortKeyAndOrderType';
import { OrderType } from '../../../common/domain/model/OrderType';

export interface CatSortKeyAndOrderType extends BaseEntitySortKeyAndOrderType {
  name?: OrderType;
}
