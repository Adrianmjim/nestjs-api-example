import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Converter } from '../../../common/domain/service/Converter';
import { UserInsertCommand } from '../../domain/command/UserInsertCommand';
import { UserTypeOrm } from '../typeOrm/model/UserTypeOrm';

@Injectable()
export class UserInsertCommandToUserInsertQueryTypeOrmConverter
  implements Converter<UserInsertCommand, DeepPartial<UserTypeOrm>>
{
  public convert(input: UserInsertCommand): DeepPartial<UserTypeOrm> {
    const userInsertQueryTypeOrm: DeepPartial<UserTypeOrm> = {
      age: input.age,
      email: input.email,
      name: input.name,
      surname: input.surname,
    };

    return userInsertQueryTypeOrm;
  }
}
