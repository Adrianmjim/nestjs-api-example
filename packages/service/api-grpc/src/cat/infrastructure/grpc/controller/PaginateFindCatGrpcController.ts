import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CatPaginateFindQuery, CatFindQuery } from '@nestjs-api-example/core-cat/query';
import { Pagination, Cat } from '@nestjs-api-example/core-entity/model';

import { PaginateFindCatGrpc } from '../model/PaginateFindCatGrpc';

@Controller()
export class PaginateFindCatGrpcController {
  public constructor(private readonly queryBus: QueryBus) {}

  @UsePipes(
    new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true }, whitelist: true }),
  )
  @GrpcMethod('CatService', 'PaginateFind')
  public async paginateFind(data: PaginateFindCatGrpc): Promise<Pagination<Cat>> {
    const catPaginateFindQuery: CatPaginateFindQuery = new CatPaginateFindQuery(new CatFindQuery({}), {
      limit: data.limit,
      page: data.page,
    });

    const paginationCat: Pagination<Cat> = await this.queryBus.execute(catPaginateFindQuery);

    return paginationCat;
  }
}
