import { EntityData } from '@mikro-orm/core';
import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

export class CatSetQueryMikroOrmFixtures {
  public static get withBornDate(): EntityData<CatMikroOrm> {
    const catSetQueryMikroOrm: EntityData<CatMikroOrm> = {
      bornDate: CatFixtures.any.bornDate,
    };

    return catSetQueryMikroOrm;
  }

  public static get withColor(): EntityData<CatMikroOrm> {
    const catSetQueryMikroOrm: EntityData<CatMikroOrm> = {
      color: CatFixtures.any.color,
    };

    return catSetQueryMikroOrm;
  }

  public static get withName(): EntityData<CatMikroOrm> {
    const catSetQueryMikroOrm: EntityData<CatMikroOrm> = {
      name: CatFixtures.any.name,
    };

    return catSetQueryMikroOrm;
  }
}
