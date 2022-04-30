import { Injectable } from '@nestjs/common';
import { Converter } from '../../../common/domain/service/Converter';
import { User } from '../../domain/model/User';
import { UserTypeOrm } from '../typeOrm/model/UserTypeOrm';

@Injectable()
export class UserTypeOrmToUserConverter implements Converter<UserTypeOrm, User> {
  public convert(input: UserTypeOrm): User {
    const user: User = {
      age: input.age,
      email: input.email,
      id: input.id,
      name: input.name,
      surname: input.surname,
    };

    return user;
  }
}
