import { EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { FindMikroOrmAdapter } from '@nestjs-api-example/core-common/adapter';
import { ConverterAsync } from '@nestjs-api-example/core-common/converter';
import { Cat } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync } from '../converter/CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync';
import { CatFindQueryToCatFindQueryMikroOrmConverterAsync } from '../converter/CatFindQueryToCatFindQueryMikroOrmConverterAsync';
import { CatMikroOrmToCatConverterAsync } from '../converter/CatMikroOrmToCatConverterAsync';

@Injectable()
export class FindCatMikroOrmAdapter extends FindMikroOrmAdapter<CatFindQuery, CatMikroOrm, Cat> {
  public constructor(
    @InjectRepository(CatMikroOrm)
    catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatFindQueryToCatFindQueryMikroOrmConverterAsync)
    catFindQueryToCatFindQueryMikroOrmConverterAsync: ConverterAsync<CatFindQuery, ObjectQuery<CatMikroOrm>>,
    @Inject(CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync)
    catFindQueryToCatFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<CatFindQuery, FindOptions<CatMikroOrm>>,
    @Inject(CatMikroOrmToCatConverterAsync)
    catMikroOrmToCatConverterAsync: ConverterAsync<CatMikroOrm, Cat>,
  ) {
    super(
      catMikroOrmRepository,
      catFindQueryToCatFindQueryMikroOrmConverterAsync,
      catFindQueryToCatFindOptionsQueryMikroOrmConverterAsync,
      catMikroOrmToCatConverterAsync,
    );
  }
}
