import { beforeAll, describe, expect, it } from '@jest/globals';

import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

import { DatabaseConfig } from './DatabaseConfig';
import { getMikroOrmModuleOptions } from './getMikroOrmModuleOptions';
import { DatabaseConfigFixtures } from '../../fixtures/infrastructure/database/DatabaseConfigFixtures';
import { MikroOrmModuleOptionsFixtures } from '../../fixtures/infrastructure/mikroOrm/MikroOrmModuleOptionsFixtures';

describe(getMikroOrmModuleOptions.name, () => {
  let mikroOrmConfig: DatabaseConfig;

  beforeAll(() => {
    mikroOrmConfig = DatabaseConfigFixtures.any;
  });

  describe('when called', () => {
    let result: MikroOrmModuleOptions;
    let mikroOrmModuleOptionsFixture: MikroOrmModuleOptions;

    beforeAll(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      mikroOrmModuleOptionsFixture = MikroOrmModuleOptionsFixtures.any;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result = getMikroOrmModuleOptions(mikroOrmConfig);
    });

    it('should return the correct config', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(result).toMatchObject(mikroOrmModuleOptionsFixture);
    });
  });
});
