import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';

import { InsertOneCatGraphQlInput } from '../../../../infrastructure/graphql/model/InsertOneCatGraphQlInput';

export class InsertOneCatGraphQlInputFixtures {
  public static get any(): InsertOneCatGraphQlInput {
    const insertOneCatGraphQlInput: InsertOneCatGraphQlInput = new InsertOneCatGraphQlInput();

    insertOneCatGraphQlInput.bornDate = CatFixtures.any.bornDate;
    insertOneCatGraphQlInput.color = CatFixtures.any.color;
    insertOneCatGraphQlInput.name = CatFixtures.any.name;

    return insertOneCatGraphQlInput;
  }
}
