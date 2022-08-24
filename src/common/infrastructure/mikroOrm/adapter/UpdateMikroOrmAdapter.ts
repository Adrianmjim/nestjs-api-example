import { AnyEntity, EntityData, EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { UpdateAdapter } from '../../../domain/adapter/UpdateAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { InvalidArgumentException } from '../../../domain/exception/InvalidArgumentException';
import { PostgreSqlErrorType } from '../../postgresql/model/PostgreSqlErrorType';
import { isPostgreSqlErrorWithErrorType } from '../../postgresql/typeguard/isPostgreSqlErrorWithErrorType';

@Injectable()
export class UpdateMikroOrmAdapter<TCommand, TModelDb extends AnyEntity> implements UpdateAdapter<TCommand> {
  public constructor(
    private readonly entityRepository: EntityRepository<TModelDb>,
    private readonly updateCommandToFindQueryMikroOrmConverter: ConverterAsync<TCommand, ObjectQuery<TModelDb>>,
    private readonly updateCommandToSetQueryMikroOrmConverter: ConverterAsync<TCommand, EntityData<TModelDb>>,
  ) {}

  public async update(command: TCommand): Promise<void> {
    const findQueryMikroOrm: ObjectQuery<TModelDb> = await this.updateCommandToFindQueryMikroOrmConverter.convert(
      command,
    );

    const modelsDb: TModelDb[] = await this.entityRepository.find(findQueryMikroOrm);

    const setQueryMikroOrm: EntityData<TModelDb> = await this.updateCommandToSetQueryMikroOrmConverter.convert(command);

    for (const modelDb of modelsDb) {
      this.entityRepository.assign(modelDb, setQueryMikroOrm);
    }

    try {
      await this.entityRepository.flush();
    } catch (error: unknown) {
      if (isPostgreSqlErrorWithErrorType(error, [PostgreSqlErrorType.FOREIGN_KEY_VIOLATION])) {
        throw new InvalidArgumentException('Foreign key violation');
      } else {
        throw error;
      }
    }
  }
}
