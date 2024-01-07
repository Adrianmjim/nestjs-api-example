import { EntityRepository, ObjectQuery, EntityData } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateMikroOrmAdapter } from '@nestjs-api-example/core-common/adapter';
import { ConverterAsync } from '@nestjs-api-example/core-common/converter';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatUpdateCommandToCatFindQueryMikroOrmConverterAsync } from '../converter/CatUpdateCommandToCatFindQueryMikroOrmConverterAsync';
import { CatUpdateCommandToCatSetQueryMikroOrmConverterAsync } from '../converter/CatUpdateCommandToCatSetQueryMikroOrmConverterAsync';

@Injectable()
export class UpdateCatMikroOrmAdapter extends UpdateMikroOrmAdapter<CatUpdateCommand, CatMikroOrm> {
  public constructor(
    @InjectRepository(CatMikroOrm)
    catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatUpdateCommandToCatFindQueryMikroOrmConverterAsync)
    catUpdateCommandToCatFindQueryMikroOrmConverterAsync: ConverterAsync<CatUpdateCommand, ObjectQuery<CatMikroOrm>[]>,
    @Inject(CatUpdateCommandToCatSetQueryMikroOrmConverterAsync)
    catUpdateCommandToCatSetQueryMikroOrmConverterAsync: ConverterAsync<CatUpdateCommand, EntityData<CatMikroOrm>[]>,
  ) {
    super(
      catMikroOrmRepository,
      catUpdateCommandToCatFindQueryMikroOrmConverterAsync,
      catUpdateCommandToCatSetQueryMikroOrmConverterAsync,
    );
  }
}
