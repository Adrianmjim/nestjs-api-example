import { QueryBus } from '@nestjs/cqrs';
import DataLoader from 'dataloader';

import { User } from '../../../domain/model/User';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';

export function createUserDataLoader(queryBus: QueryBus): DataLoader<string, User> {
  return new DataLoader<string, User>(async (userIds: readonly string[]) => {
    const users: User[] = await queryBus.execute(new UserFindQuery(userIds as string[], undefined));

    const usersMap: Map<string, User> = new Map<string, User>(users.map((user: User) => [user.id, user]));

    const sortUsers: User[] = userIds.map((userId: string) => usersMap.get(userId) as User);

    return sortUsers;
  });
}
