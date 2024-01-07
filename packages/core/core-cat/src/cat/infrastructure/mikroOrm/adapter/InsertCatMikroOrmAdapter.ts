import { EntityRepository, RequiredEntityData } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { InsertMikroOrmAdapter } from '@nestjs-api-example/core-common/adapter';
import { ConverterAsync } from '@nestjs-api-example/core-common/converter';
import { Cat } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { CatInsertCommandToCatInsertQueryMikroOrmConverterAsync } from '../converter/CatInsertCommandToCatInsertQueryMikroOrmConverterAsync';
import { CatMikroOrmToCatConverterAsync } from '../converter/CatMikroOrmToCatConverterAsync';

@Injectable()
export class InsertCatMikroOrmAdapter extends InsertMikroOrmAdapter<CatInsertCommand, CatMikroOrm, Cat> {
  public constructor(
    @InjectRepository(CatMikroOrm)
    catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatInsertCommandToCatInsertQueryMikroOrmConverterAsync)
    catInsertCommandToCatInsertQueryMikroOrmConverterAsync: ConverterAsync<
      CatInsertCommand,
      RequiredEntityData<CatMikroOrm>[]
    >,
    @Inject(CatMikroOrmToCatConverterAsync)
    catMikroOrmToCatConverterAsync: ConverterAsync<CatMikroOrm, Cat>,
  ) {
    super(
      catMikroOrmRepository,
      catInsertCommandToCatInsertQueryMikroOrmConverterAsync,
      catMikroOrmToCatConverterAsync,
    );
  }
}
