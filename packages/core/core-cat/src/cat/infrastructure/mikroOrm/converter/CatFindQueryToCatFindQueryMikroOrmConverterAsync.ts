import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync } from '@nestjs-api-example/core-common/converter';
import { BaseEntityMikroOrm, CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatFindQuery } from '../../../domain/query/CatFindQuery';

@Injectable()
export class CatFindQueryToCatFindQueryMikroOrmConverterAsync extends BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync<
  CatFindQuery,
  ObjectQuery<CatMikroOrm>
> {
  protected async convertToSpecificEntityFindQueryMikroOrm(
    _input: CatFindQuery,
    baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<CatMikroOrm>> {
    const catFindQueryMikroOrm: ObjectQuery<CatMikroOrm> = {
      ...(baseEntityFindQueryMikroOrm as ObjectQuery<CatMikroOrm>),
    };

    return catFindQueryMikroOrm;
  }
}
