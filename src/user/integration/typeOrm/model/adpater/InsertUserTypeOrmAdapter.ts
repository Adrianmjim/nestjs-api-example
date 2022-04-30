import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Converter } from '../../../../../common/domain/service/Converter';
import { InsertTypeOrmAdapter } from '../../../../../common/integration/typeOrm/adapter/InsertTypeOrmAdapter';
import { UserInsertCommand } from '../../../../domain/command/UserInsertCommand';
import { User } from '../../../../domain/model/User';
import { UserInsertCommandToUserInsertQueryTypeOrmConverter } from '../../../converter/UserInsertCommandToUserInsertQueryTypeOrmConverter';
import { UserTypeOrmToUserConverter } from '../../../converter/UserTypeOrmToUserConverter';
import { UserTypeOrm } from '../UserTypeOrm';

@Injectable()
export class InsertUserTypeOrmAdapter extends InsertTypeOrmAdapter<User, UserTypeOrm, UserInsertCommand> {
  public constructor(
    @InjectRepository(UserTypeOrm) repository: Repository<UserTypeOrm>,
    @Inject(UserTypeOrmToUserConverter) userTypeOrmToUserConverter: Converter<UserTypeOrm, User>,
    @Inject(UserInsertCommandToUserInsertQueryTypeOrmConverter)
    userInsertCommandToUserInsertQueryTypeOrmConverter: Converter<UserInsertCommand, DeepPartial<UserTypeOrm>>,
  ) {
    super(repository, userTypeOrmToUserConverter, userInsertCommandToUserInsertQueryTypeOrmConverter);
  }
}
