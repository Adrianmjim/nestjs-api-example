import { beforeAll, describe, expect, it } from '@jest/globals';

import { ObjectQuery } from '@mikro-orm/core';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync } from './CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync';
import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';
import { CatDeleteCommandFixtures } from '../../../fixtures/domain/command/CatDeleteCommandFixtures';
import { CatDeleteQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/CatDeleteQueryMikroOrmFixtures';

describe(CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync.name, () => {
  let catDeleteCommandToCatDeleteQueryMikroOrmConverterAsync: CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync;

  beforeAll(() => {
    catDeleteCommandToCatDeleteQueryMikroOrmConverterAsync =
      new CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let catDeleteCommandFixture: CatDeleteCommand;
      let catDeleteQueryMikroOrmFixture: ObjectQuery<CatMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        catDeleteCommandFixture = CatDeleteCommandFixtures.any;
        catDeleteQueryMikroOrmFixture = CatDeleteQueryMikroOrmFixtures.any;

        result = await catDeleteCommandToCatDeleteQueryMikroOrmConverterAsync.convert(catDeleteCommandFixture);
      });

      it('should return a ObjectQuery<CatMikroOrm>', () => {
        expect(result).toStrictEqual(catDeleteQueryMikroOrmFixture);
      });
    });
  });
});
