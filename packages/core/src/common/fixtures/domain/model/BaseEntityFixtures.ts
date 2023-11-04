import { BaseEntity } from '../../../domain/model/BaseEntity';
import { DateFixtures } from './DateFixtures';

export class BaseEntityFixtures {
  public static get any(): BaseEntity {
    const baseEntity: BaseEntity = {
      createdAt: DateFixtures.createdAt,
      id: 'base-entity-id-example',
      updatedAt: undefined,
      version: 0,
    };

    return baseEntity;
  }

  public static get withUpdatedAt(): BaseEntity {
    const baseEntity: BaseEntity = {
      createdAt: DateFixtures.createdAt,
      id: 'base-entity-id-example',
      updatedAt: DateFixtures.updatedAt,
      version: 0,
    };

    return baseEntity;
  }
}
