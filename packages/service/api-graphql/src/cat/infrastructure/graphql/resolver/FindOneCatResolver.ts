import { QueryBus } from '@nestjs/cqrs';
import { Args, Resolver } from '@nestjs/graphql';
import { CatFindOneQuery } from '@nestjs-api-example/core-cat/query';
import { EntityNotFoundException } from '@nestjs-api-example/core-common/exception';
import { Cat } from '@nestjs-api-example/core-entity/model';

@Resolver('Cat')
export class FindOneCatResolver {
  public constructor(private readonly queryBus: QueryBus) {}

  public async findOne(@Args('id') catId: string): Promise<Cat> {
    const catFindOneQuery: CatFindOneQuery = new CatFindOneQuery({ ids: [catId] });

    const cat: Cat | undefined = await this.queryBus.execute(catFindOneQuery);

    if (cat === undefined) {
      throw new EntityNotFoundException(`Cat with id ${catId} not found`);
    }

    return cat;
  }
}
