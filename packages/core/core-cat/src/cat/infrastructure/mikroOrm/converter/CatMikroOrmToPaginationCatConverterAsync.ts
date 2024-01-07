import { Inject, Injectable } from '@nestjs/common';
import {
  AnyEntityMikroOrmToPaginationEntityConverterAsync,
  ConverterAsync,
} from '@nestjs-api-example/core-common/converter';
import { Pagination, Cat } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatMikroOrmToCatConverterAsync } from './CatMikroOrmToCatConverterAsync';

@Injectable()
export class CatMikroOrmToPaginationCatConverterAsync extends AnyEntityMikroOrmToPaginationEntityConverterAsync<
  CatMikroOrm[],
  Pagination<Cat>
> {
  public constructor(
    @Inject(CatMikroOrmToCatConverterAsync)
    catMikroOrmToCatConverterAsync: ConverterAsync<CatMikroOrm, Cat>,
  ) {
    super(catMikroOrmToCatConverterAsync);
  }
}
