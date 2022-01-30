import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { InsertTypeOrmAdapter } from '../../../../common/integration/typeOrm/adapter/InsertTypeOrmAdapter';
import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { Cat } from '../../../domain/model/Cat';
import { CatTypeOrm } from '../model/CatTypeOrm';
import { CatInsertCommandToCatInsertQueryTypeOrmConverter } from '../service/CatInsertCommandToCatInsertQueryTypeOrmConverter';
import { CatTypeOrmToCatConverter } from '../service/CatTypeOrmToCatConverter';

@Injectable()
export class InsertCatTypeOrmAdapter extends InsertTypeOrmAdapter<Cat, CatTypeOrm, CatInsertCommand> {
  public constructor(
    @InjectRepository(CatTypeOrm) repository: Repository<CatTypeOrm>,
    @Inject(CatTypeOrmToCatConverter)
    catTypeOrmToCatConverter: Converter<CatTypeOrm, Cat>,
    @Inject(CatInsertCommandToCatInsertQueryTypeOrmConverter)
    catInsertCommandToCatInsertQueryTypeOrmConverter: Converter<CatInsertCommand, DeepPartial<CatTypeOrm>>,
  ) {
    super(repository, catTypeOrmToCatConverter, catInsertCommandToCatInsertQueryTypeOrmConverter);
  }
}
