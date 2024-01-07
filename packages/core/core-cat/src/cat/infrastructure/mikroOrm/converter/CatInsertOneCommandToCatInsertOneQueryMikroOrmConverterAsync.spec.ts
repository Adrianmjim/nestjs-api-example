import { beforeAll, describe, expect, it } from '@jest/globals';

import { RequiredEntityData } from '@mikro-orm/core';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync } from './CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync';
import { CatInsertOneCommand } from '../../../domain/command/CatInsertOneCommand';
import { CatInsertOneCommandFixtures } from '../../../fixtures/domain/command/CatInsertOneCommandFixtures';
import { CatInsertOneQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/CatInsertOneQueryTypeOrmFixtures';

describe(CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync.name, () => {
  let catInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsyncTest: CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync;

  beforeAll(() => {
    catInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsyncTest =
      new CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let catInsertOneCommandFixture: CatInsertOneCommand;
      let catInsertOneQueryMikroOrmFixture: RequiredEntityData<CatMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        catInsertOneCommandFixture = CatInsertOneCommandFixtures.any;
        catInsertOneQueryMikroOrmFixture = CatInsertOneQueryMikroOrmFixtures.any;

        result =
          await catInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsyncTest.convert(catInsertOneCommandFixture);
      });

      it('should return a RequiredEntityData<CatMikroOrm>', () => {
        expect(result).toStrictEqual(catInsertOneQueryMikroOrmFixture);
      });
    });
  });
});
