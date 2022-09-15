import { BaseEntity } from '../../../domain/model/BaseEntity';

export class BaseEntityFixtures {
  public static get any(): BaseEntity {
    const dateFixture: Date = new Date('2020-01-01');

    return {
      createdAt: dateFixture,
      id: 'base-entity-id-example',
      updatedAt: undefined,
      version: 0,
    };
  }
}
