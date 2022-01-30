import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Converter } from '../../../../common/domain/service/Converter';
import { UpdateTypeOrmAdapter } from '../../../../common/integration/typeOrm/adapter/UpdateTypeOrmAdapter';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatTypeOrm } from '../model/CatTypeOrm';
import { CatUpdateCommandToCatFindQueryTypeOrmConverter } from '../service/CatUpdateCommandToCatFindQueryTypeOrmConverter';
import { CatUpdateCommandToCatSetQueryTypeOrmConverter } from '../service/CatUpdateCommandToCatSetQueryTypeOrmConverter';

@Injectable()
export class UpdateCatTypeOrmAdapter extends UpdateTypeOrmAdapter<CatTypeOrm, CatUpdateCommand> {
  public constructor(
    @InjectRepository(CatTypeOrm) repository: Repository<CatTypeOrm>,
    @Inject(CatUpdateCommandToCatSetQueryTypeOrmConverter)
    catUpdateCommandToCatSetQueryTypeOrmConverter: Converter<CatUpdateCommand, QueryDeepPartialEntity<CatTypeOrm>>,
    @Inject(CatUpdateCommandToCatFindQueryTypeOrmConverter)
    catUpdateCommandToCatFindQueryTypeOrmConverter: Converter<CatUpdateCommand, FindConditions<CatTypeOrm>>,
  ) {
    super(catUpdateCommandToCatFindQueryTypeOrmConverter, catUpdateCommandToCatSetQueryTypeOrmConverter, repository);
  }
}
