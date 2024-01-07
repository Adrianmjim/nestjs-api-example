import { BaseEntityFindQuery } from '@nestjs-api-example/core-common/query';
import { CatSortKeyAndOrderType } from '@nestjs-api-example/core-entity/model';

export class CatFindQuery implements BaseEntityFindQuery {
  public readonly ids: string[] | undefined = undefined;
  public readonly sortKeyAndOrderTypes: CatSortKeyAndOrderType[] | undefined = undefined;

  public constructor(args: Partial<CatFindQuery>) {
    Object.assign(this, args);
  }
}
