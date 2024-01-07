import { EntityData, EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateOneMikroOrmAdapter } from '@nestjs-api-example/core-common/adapter';
import { ConverterAsync } from '@nestjs-api-example/core-common/converter';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatUpdateOneCommand } from '../../../domain/command/CatUpdateOneCommand';
import { CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync } from '../converter/CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync';
import { CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync } from '../converter/CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync';

@Injectable()
export class UpdateOneCatMikroOrmAdapter extends UpdateOneMikroOrmAdapter<CatUpdateOneCommand, CatMikroOrm> {
  public constructor(
    @InjectRepository(CatMikroOrm)
    catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync)
    catUpdateOneCommandToCatFindQueryMikroOrmConverterAsync: ConverterAsync<
      CatUpdateOneCommand,
      ObjectQuery<CatMikroOrm>
    >,
    @Inject(CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync)
    catUpdateOneCommandToCatSetQueryMikroOrmConverterAsync: ConverterAsync<
      CatUpdateOneCommand,
      EntityData<CatMikroOrm>
    >,
  ) {
    super(
      catMikroOrmRepository,
      catUpdateOneCommandToCatFindQueryMikroOrmConverterAsync,
      catUpdateOneCommandToCatSetQueryMikroOrmConverterAsync,
    );
  }
}
