import { BaseEntity } from '../../../domain/model/BaseEntity';

export class BaseEntityFixtures {
  public static get any(): BaseEntity {
    const dateFixture: Date = new Date('2020-01-01');

    return {
      createdAt: dateFixture,
      createdById: 'base-entity-created-by-id-example',
      id: 'base-entity-id-example',
      updatedAt: undefined,
      updatedById: undefined,
      version: 0,
    };
  }

  public static get withUpdatedAtAndUpdatedById(): BaseEntity {
    const dateFixture: Date = new Date('2020-01-01');

    return {
      createdAt: dateFixture,
      createdById: 'base-entity-created-by-id-example',
      id: 'base-entity-id-example',
      updatedAt: dateFixture,
      updatedById: 'base-entity-updated-by-id-example',
      version: 0,
    };
  }
}
