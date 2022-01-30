import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { DeleteTypeOrmAdapter } from '../../../../common/integration/typeOrm/adapter/DeleteTypeOrmAdapter';
import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';
import { CatTypeOrm } from '../model/CatTypeOrm';
import { CatDeleteCommandToCatDeleteQueryTypeOrmConverter } from '../service/CatDeleteCommandToCatDeleteQueryTypeOrmConverter';

@Injectable()
export class DeleteCatTypeOrmAdapter extends DeleteTypeOrmAdapter<CatTypeOrm, CatDeleteCommand> {
  public constructor(
    @InjectRepository(CatTypeOrm) repository: Repository<CatTypeOrm>,
    @Inject(CatDeleteCommandToCatDeleteQueryTypeOrmConverter)
    catDeleteCommandToCatDeleteQueryTypeOrmConverter: Converter<CatDeleteCommand, DeepPartial<CatTypeOrm>>,
  ) {
    super(repository, catDeleteCommandToCatDeleteQueryTypeOrmConverter);
  }
}
