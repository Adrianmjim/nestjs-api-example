import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Converter } from '../../../common/domain/service/Converter';
import { UserDeleteCommand } from '../../domain/command/UserDeleteCommand';
import { User } from '../../domain/model/User';

@Injectable()
export class UserDeleteCommandToUserDeleteQueryTypeOrmConverter implements Converter<UserDeleteCommand, DeepPartial<User>> {
  public convert(input: UserDeleteCommand): DeepPartial<User> {
    const userDeleteQueryTypeOrm: DeepPartial<User> = {
      id: input.id,
    };

    return userDeleteQueryTypeOrm;
  }
}
