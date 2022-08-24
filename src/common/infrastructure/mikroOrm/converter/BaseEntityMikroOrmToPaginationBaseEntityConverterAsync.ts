import { Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntity } from '../../../domain/model/BaseEntity';
import { Pagination } from '../../../domain/model/Pagination';
import { PaginationMeta } from '../../../domain/model/PaginationMeta';
import { BaseEntityPaginateFindQuery } from '../../../domain/query/BaseEntityPaginateFindQuery';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntityMikroOrmToPaginationBaseEntityConverterAsync<
  TInput extends BaseEntityMikroOrm[],
  TOutput extends Pagination<BaseEntity>,
> implements ConverterAsync<TInput, TOutput, { query: BaseEntityPaginateFindQuery; totalItems: number }>
{
  public constructor(private readonly modelDbToModelConverterAsync: ConverterAsync<BaseEntityMikroOrm, BaseEntity>) {}

  public async convert(
    input: TInput,
    paginationContext: { query: BaseEntityPaginateFindQuery; totalItems: number },
  ): Promise<TOutput> {
    const paginationMeta: PaginationMeta = {
      currentPage: paginationContext.query.paginationOptions.page,
      itemCount: input.length,
      itemsPerPage: paginationContext.query.paginationOptions.limit,
      totalItems: paginationContext.totalItems,
      totalPages: Math.ceil(paginationContext.totalItems / paginationContext.query.paginationOptions.limit),
    };

    const models: BaseEntity[] = await Promise.all(
      input.map(async (modelDb: BaseEntityMikroOrm) => this.modelDbToModelConverterAsync.convert(modelDb)),
    );

    const output: Pagination<BaseEntity> = {
      items: models,
      meta: paginationMeta,
    };

    return output as TOutput;
  }
}
