import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcStreamMethod } from '@nestjs/microservices';
import { CatPaginateFindQuery, CatFindQuery } from '@nestjs-api-example/core-cat/query';
import { Pagination, Cat } from '@nestjs-api-example/core-entity/model';
import { Observable, map, mergeMap } from 'rxjs';

import { PaginateFindCatGrpc } from '../model/PaginateFindCatGrpc';

@Controller()
export class PaginateFindStreamCatGrpcController {
  public constructor(private readonly queryBus: QueryBus) {}

  @GrpcStreamMethod('CatService', 'PaginateFindStream')
  public paginateFindStream(messages: Observable<PaginateFindCatGrpc>): Observable<Pagination<Cat>> {
    return messages.pipe(
      map(
        (paginateFindCatGrpc: PaginateFindCatGrpc) =>
          new CatPaginateFindQuery(new CatFindQuery({}), {
            limit: paginateFindCatGrpc.limit,
            page: paginateFindCatGrpc.page,
          }),
      ),
      mergeMap(async (catPaginateFindQuery: CatPaginateFindQuery) =>
        this.queryBus.execute<CatPaginateFindQuery, Pagination<Cat>>(catPaginateFindQuery),
      ),
    );
  }
}
