import { Pagination, Cat } from '@nestjs-api-example/core/models';
import { CatPaginateFindQuery, CatFindQuery } from '@nestjs-api-example/core/queries';
import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcStreamMethod } from '@nestjs/microservices';
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
