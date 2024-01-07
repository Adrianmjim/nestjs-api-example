import { UpdateOneCatGraphQlInput } from '../../../../infrastructure/graphql/model/UpdateOneCatGraphQlInput';

export class UpdateOneCatGraphQlInputFixtures {
  public static get any(): UpdateOneCatGraphQlInput {
    const updateOneCatGraphQlInput: UpdateOneCatGraphQlInput = new UpdateOneCatGraphQlInput();

    return updateOneCatGraphQlInput;
  }
}
