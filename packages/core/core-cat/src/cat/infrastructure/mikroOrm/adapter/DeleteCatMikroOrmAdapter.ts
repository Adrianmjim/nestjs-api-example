import { EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { DeleteMikroOrmAdapter } from '@nestjs-api-example/core-common/adapter';
import { ConverterAsync } from '@nestjs-api-example/core-common/converter';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';
import { CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync } from '../converter/CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync';

@Injectable()
export class DeleteCatMikroOrmAdapter extends DeleteMikroOrmAdapter<CatDeleteCommand, CatMikroOrm> {
  public constructor(
    @InjectRepository(CatMikroOrm)
    catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync)
    catDeleteCommandToCatDeleteQueryMikroOrmConverterAsync: ConverterAsync<CatDeleteCommand, ObjectQuery<CatMikroOrm>>,
  ) {
    super(catMikroOrmRepository, catDeleteCommandToCatDeleteQueryMikroOrmConverterAsync);
  }
}
