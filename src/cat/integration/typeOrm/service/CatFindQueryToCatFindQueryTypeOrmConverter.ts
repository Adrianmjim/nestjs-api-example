import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatTypeOrm } from '../model/CatTypeOrm';

@Injectable()
export class CatFindQueryToCatFindQueryTypeOrmConverter implements Converter<CatFindQuery, FindConditions<CatTypeOrm>> {
  public convert(input: CatFindQuery): FindConditions<CatTypeOrm> {
    const catFindQueryTypeOrm: FindConditions<CatTypeOrm> = {};

    if (input.age !== undefined) {
      catFindQueryTypeOrm.age = input.age;
    }

    if (input.breed !== undefined) {
      catFindQueryTypeOrm.breed = input.breed;
    }

    if (input.favouriteFoodId !== undefined) {
      catFindQueryTypeOrm.favouriteFood = {
        id: input.favouriteFoodId,
      };
    }

    if (input.id !== undefined) {
      catFindQueryTypeOrm.id = input.id;
    }

    if (input.name !== undefined) {
      catFindQueryTypeOrm.name = input.name;
    }

    if (input.ownerId !== undefined) {
      catFindQueryTypeOrm.owner = {
        id: input.ownerId,
      };
    }

    return catFindQueryTypeOrm;
  }
}
