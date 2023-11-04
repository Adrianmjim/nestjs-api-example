import { IMigrator, MikroORM } from '@mikro-orm/core';

import { AppModule } from './AppModule';

describe(AppModule.name, () => {
  let migratorMock: jest.Mocked<IMigrator>;
  let mikroOrmMock: jest.Mocked<MikroORM>;
  let appModule: AppModule;

  beforeAll(() => {
    migratorMock = {
      up: jest.fn(),
    } as Partial<jest.Mocked<IMigrator>> as jest.Mocked<IMigrator>;

    mikroOrmMock = {
      getMigrator: jest.fn(),
    } as Partial<jest.Mocked<MikroORM>> as jest.Mocked<MikroORM>;

    appModule = new AppModule(mikroOrmMock);
  });

  describe('.onModuleInit()', () => {
    describe('when called', () => {
      beforeAll(async () => {
        mikroOrmMock.getMigrator.mockReturnValueOnce(migratorMock);

        await appModule.onModuleInit();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call mikroOrm.getMigrator()', () => {
        expect(mikroOrmMock.getMigrator).toHaveBeenCalledTimes(1);
        expect(mikroOrmMock.getMigrator).toHaveBeenCalledWith();
      });

      it('should call mikroOrm.getMigrator().up()', () => {
        expect(migratorMock.up).toHaveBeenCalledTimes(1);
        expect(migratorMock.up).toHaveBeenCalledWith();
      });
    });
  });
});
