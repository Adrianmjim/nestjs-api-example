import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { Converter } from '../../../common/domain/service/Converter';
import { UserFindQuery } from '../../domain/query/UserFindQuery';
import { UserTypeOrm } from '../typeOrm/model/UserTypeOrm';

@Injectable()
export class UserFindQueryToUserFindQueryTypeOrmConverter
  implements Converter<UserFindQuery, FindConditions<UserTypeOrm>>
{
  public convert(input: UserFindQuery): FindConditions<UserTypeOrm> {
    const userFindQueryTypeOrm: FindConditions<UserTypeOrm> = {};

    if (input.email !== undefined) {
      userFindQueryTypeOrm.email = input.email;
    }

    if (input.id !== undefined) {
      userFindQueryTypeOrm.id = input.id;
    }

    return userFindQueryTypeOrm;
  }
}
