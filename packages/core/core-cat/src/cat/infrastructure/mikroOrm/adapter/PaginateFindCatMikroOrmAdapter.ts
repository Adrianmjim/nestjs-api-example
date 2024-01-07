import { EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { PaginateFindMikroOrmAdapter } from '@nestjs-api-example/core-common/adapter';
import { ConverterAsync } from '@nestjs-api-example/core-common/converter';
import { Cat, Pagination } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatPaginateFindQuery } from '../../../domain/query/CatPaginateFindQuery';
import { CatMikroOrmToPaginationCatConverterAsync } from '../converter/CatMikroOrmToPaginationCatConverterAsync';
import { CatPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync } from '../converter/CatPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync';
import { CatPaginateFindQueryToCatFindQueryMikroOrmConverterAsync } from '../converter/CatPaginateFindQueryToCatFindQueryMikroOrmConverterAsync';

@Injectable()
export class PaginateFindCatMikroOrmAdapter extends PaginateFindMikroOrmAdapter<
  CatPaginateFindQuery,
  CatMikroOrm,
  Cat
> {
  public constructor(
    @InjectRepository(CatMikroOrm)
    catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatPaginateFindQueryToCatFindQueryMikroOrmConverterAsync)
    catPaginateFindQueryToCatFindQueryMikroOrmConverterAsync: ConverterAsync<
      CatPaginateFindQuery,
      ObjectQuery<CatMikroOrm>
    >,
    @Inject(CatPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync)
    catPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<
      CatPaginateFindQuery,
      FindOptions<CatMikroOrm>
    >,
    @Inject(CatMikroOrmToPaginationCatConverterAsync)
    catMikroOrmToPaginationCatConverterAsync: ConverterAsync<
      CatMikroOrm[],
      Pagination<Cat>,
      { query: CatPaginateFindQuery; totalItems: number }
    >,
  ) {
    super(
      catMikroOrmRepository,
      catPaginateFindQueryToCatFindQueryMikroOrmConverterAsync,
      catPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync,
      catMikroOrmToPaginationCatConverterAsync,
    );
  }
}
