import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { FindTypeOrmAdapter } from '../../../../common/integration/typeOrm/adapter/FindTypeOrmAdapter';
import { User } from '../../../domain/model/User';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserFindQueryToUserFindQueryTypeOrmConverter } from '../../converter/UserFindQueryToUserFindQueryTypeOrmConverter';
import { UserTypeOrmToUserConverter } from '../../converter/UserTypeOrmToUserConverter';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class FindUserTypeOrmAdapter extends FindTypeOrmAdapter<User, UserTypeOrm, UserFindQuery> {
  public constructor(
    @InjectRepository(UserTypeOrm) repository: Repository<UserTypeOrm>,
    @Inject(UserTypeOrmToUserConverter) userTypeOrmToUserConverter: Converter<UserTypeOrm, User>,
    @Inject(UserFindQueryToUserFindQueryTypeOrmConverter)
    userFindQueryToUserFindQueryTypeOrmConverter: Converter<UserFindQuery, FindConditions<UserTypeOrm>>,
  ) {
    super(repository, userTypeOrmToUserConverter, userFindQueryToUserFindQueryTypeOrmConverter);
  }
}
