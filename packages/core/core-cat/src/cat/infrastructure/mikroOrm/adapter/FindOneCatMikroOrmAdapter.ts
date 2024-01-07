import { EntityRepository, FindOneOptions, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { FindOneMikroOrmAdapter } from '@nestjs-api-example/core-common/adapter';
import { ConverterAsync } from '@nestjs-api-example/core-common/converter';
import { Cat } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatFindOneQuery } from '../../../domain/query/CatFindOneQuery';
import { CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync } from '../converter/CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync';
import { CatFindQueryToCatFindQueryMikroOrmConverterAsync } from '../converter/CatFindQueryToCatFindQueryMikroOrmConverterAsync';
import { CatMikroOrmToCatConverterAsync } from '../converter/CatMikroOrmToCatConverterAsync';

@Injectable()
export class FindOneCatMikroOrmAdapter extends FindOneMikroOrmAdapter<CatFindOneQuery, CatMikroOrm, Cat> {
  public constructor(
    @InjectRepository(CatMikroOrm)
    catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatFindQueryToCatFindQueryMikroOrmConverterAsync)
    catFindQueryToCatFindQueryMikroOrmConverterAsync: ConverterAsync<CatFindOneQuery, ObjectQuery<CatMikroOrm>>,
    @Inject(CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync)
    catFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync: ConverterAsync<
      CatFindOneQuery,
      FindOneOptions<CatMikroOrm>
    >,
    @Inject(CatMikroOrmToCatConverterAsync)
    catMikroOrmToCatConverterAsync: ConverterAsync<CatMikroOrm, Cat>,
  ) {
    super(
      catMikroOrmRepository,
      catFindQueryToCatFindQueryMikroOrmConverterAsync,
      catFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync,
      catMikroOrmToCatConverterAsync,
    );
  }
}
