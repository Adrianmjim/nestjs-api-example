import { PaginateFindCatGraphQlInput } from '../../../../infrastructure/graphql/model/PaginateFindCatGraphQlInput';

export class PaginateFindCatGraphQlInputFixtures {
  public static get any(): PaginateFindCatGraphQlInput {
    const paginateFindCatGraphQlInput: PaginateFindCatGraphQlInput = new PaginateFindCatGraphQlInput();

    return paginateFindCatGraphQlInput;
  }
}
