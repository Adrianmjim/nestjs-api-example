import { AnyEntity } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Pagination, PaginationMeta } from '@nestjs-api-example/core-entity/model';
import { AnyEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { AnyEntityPaginateFindQuery } from '../../../domain/query/AnyEntityPaginateFindQuery';

@Injectable()
export class AnyEntityMikroOrmToPaginationEntityConverterAsync<
  TInput extends AnyEntityMikroOrm[],
  TOutput extends Pagination<AnyEntity>,
> implements ConverterAsync<TInput, TOutput, { query: AnyEntityPaginateFindQuery; totalItems: number }>
{
  public constructor(private readonly modelDbToModelConverterAsync: ConverterAsync<AnyEntityMikroOrm, AnyEntity>) {}

  public async convert(
    input: TInput,
    paginationContext: {
      query: AnyEntityPaginateFindQuery;
      totalItems: number;
    },
  ): Promise<TOutput> {
    const paginationMeta: PaginationMeta = {
      currentPage: paginationContext.query.paginationOptions.page,
      itemCount: input.length,
      itemsPerPage: paginationContext.query.paginationOptions.limit,
      totalItems: paginationContext.totalItems,
      totalPages: Math.ceil(paginationContext.totalItems / paginationContext.query.paginationOptions.limit),
    };

    const models: unknown[] = await Promise.all(
      input.map(async (modelDb: AnyEntity) => this.modelDbToModelConverterAsync.convert(modelDb)),
    );

    const output: Pagination<unknown> = {
      items: models,
      meta: paginationMeta,
    };

    return output as TOutput;
  }
}
