import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CatUpdateCommand } from '@nestjs-api-example/core/commands';
import { CatCoreModule } from '@nestjs-api-example/core/modules';

import { DeleteOneCatResolver } from '../graphql/resolver/DeleteOneCatResolver';
import { FindOneCatResolver } from '../graphql/resolver/FindOneCatResolver';
import { InsertOneCatResolver } from '../graphql/resolver/InsertOneCatResolver';
import { PaginateFindCatResolver } from '../graphql/resolver/PaginateFindCatResolver';

const resolvers: Provider<unknown>[] = [
  DeleteOneCatResolver,
  FindOneCatResolver,
  InsertOneCatResolver,
  PaginateFindCatResolver,
  CatUpdateCommand,
];
@Module({
  imports: [CqrsModule, CatCoreModule],
  providers: [...resolvers],
})
export class CatModule {}
