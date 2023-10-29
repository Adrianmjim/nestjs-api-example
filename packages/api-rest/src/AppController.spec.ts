import { beforeAll, describe, expect, it } from '@jest/globals';

import { AppController } from './AppController';

describe(AppController.name, () => {
  let appController: AppController;

  beforeAll(() => {
    appController = new AppController();
  });

  describe('.status()', () => {
    describe('when called', () => {
      let appFixture: string;
      let result: unknown;

      beforeAll(() => {
        appFixture = 'ok';
        result = appController.status();
      });

      it('should return ok', () => {
        expect(result).toStrictEqual(appFixture);
      });
    });
  });
});
