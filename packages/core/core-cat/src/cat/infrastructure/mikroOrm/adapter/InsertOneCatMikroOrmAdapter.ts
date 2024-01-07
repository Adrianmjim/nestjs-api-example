import { EntityRepository, RequiredEntityData } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { InsertOneMikroOrmAdapter } from '@nestjs-api-example/core-common/adapter';
import { ConverterAsync } from '@nestjs-api-example/core-common/converter';
import { Cat } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatInsertOneCommand } from '../../../domain/command/CatInsertOneCommand';
import { CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync } from '../converter/CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync';
import { CatMikroOrmToCatConverterAsync } from '../converter/CatMikroOrmToCatConverterAsync';

@Injectable()
export class InsertOneCatMikroOrmAdapter extends InsertOneMikroOrmAdapter<CatInsertOneCommand, CatMikroOrm, Cat> {
  public constructor(
    @InjectRepository(CatMikroOrm)
    catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync)
    catInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync: ConverterAsync<
      CatInsertOneCommand,
      RequiredEntityData<CatMikroOrm>
    >,
    @Inject(CatMikroOrmToCatConverterAsync)
    catMikroOrmToCatConverterAsync: ConverterAsync<CatMikroOrm, Cat>,
  ) {
    super(
      catMikroOrmRepository,
      catInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync,
      catMikroOrmToCatConverterAsync,
    );
  }
}
