import { QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Pagination, Cat } from '@nestjs-api-example/core/models';
import { CatFindQuery, CatPaginateFindQuery } from '@nestjs-api-example/core/queries';

import { PaginateFindCatGraphQlInput } from '../model/PaginateFindCatGraphQlInput';

@Resolver('Cat')
export class PaginateFindCatResolver {
  public constructor(private readonly queryBus: QueryBus) {}

  @Query('cats')
  public async paginateFind(
    @Args('paginateFindCatGraphQlInput') paginateFindCatGraphQlInput: PaginateFindCatGraphQlInput,
  ): Promise<Pagination<Cat>> {
    const catFindQuery: CatFindQuery = new CatFindQuery({});

    const catPaginateFindQuery: CatPaginateFindQuery = new CatPaginateFindQuery(catFindQuery, {
      limit: paginateFindCatGraphQlInput.limit,
      page: paginateFindCatGraphQlInput.page,
    });

    const paginationCat: Pagination<Cat> = await this.queryBus.execute(catPaginateFindQuery);

    return paginationCat;
  }
}
