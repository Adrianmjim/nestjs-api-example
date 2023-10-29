import { Cat } from '@nestjs-api-example/core/models';

import { DateFixtures } from '../../../../common/fixtures/domain/model/DateFixtures';

export class CatFixtures {
  public static get any(): Cat {
    const cat: Cat = {
      bornDate: DateFixtures.any,
      color: 'color-example',
      createdAt: DateFixtures.createdAt,
      id: 'cat-id-example',
      name: 'name-example',
      updatedAt: undefined,
      version: 0,
    };

    return cat;
  }
}
