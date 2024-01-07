import { Injectable } from '@nestjs/common';
import { BaseEntityMikroOrmToBaseEntityConverterAsync } from '@nestjs-api-example/core-common/converter';
import { BaseEntity, Cat } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

@Injectable()
export class CatMikroOrmToCatConverterAsync extends BaseEntityMikroOrmToBaseEntityConverterAsync<CatMikroOrm, Cat> {
  protected async convertToSpecificEntity(input: CatMikroOrm, baseEntity: BaseEntity): Promise<Cat> {
    const cat: Cat = {
      ...baseEntity,
      bornDate: input.bornDate,
      color: input.color,
      name: input.name,
    };

    return cat;
  }
}
