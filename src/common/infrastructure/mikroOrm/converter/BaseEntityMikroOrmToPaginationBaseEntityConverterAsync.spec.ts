import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntity } from '../../../domain/model/BaseEntity';
import { Pagination } from '../../../domain/model/Pagination';
import { BaseEntityPaginateFindQuery } from '../../../domain/query/BaseEntityPaginateFindQuery';
import { BaseEntityFixtures } from '../../../fixtures/domain/model/BaseEntityFixtures';
import { BaseEntityPaginateFindQueryFixtures } from '../../../fixtures/domain/query/BaseEntityPaginateFindQueryFixtures';
import { BaseEntityMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/model/BaseEntityMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntityMikroOrmToPaginationBaseEntityConverterAsync } from './BaseEntityMikroOrmToPaginationBaseEntityConverterAsync';

class BaseEntityMikroOrmToPaginationBaseEntityConverterAsyncTest extends BaseEntityMikroOrmToPaginationBaseEntityConverterAsync<
  BaseEntityMikroOrm[],
  Pagination<BaseEntity>
> {
  public constructor(modelDbToModelConverterAsyncMock: ConverterAsync<BaseEntityMikroOrm, BaseEntity>) {
    super(modelDbToModelConverterAsyncMock);
  }
}

describe(BaseEntityMikroOrmToPaginationBaseEntityConverterAsync.name, () => {
  let modelDbToModelConverterAsyncMock: jest.Mocked<ConverterAsync<BaseEntityMikroOrm, BaseEntity>>;
  let baseEntityMikroOrmToPaginationBaseEntityConverterAsyncTest: BaseEntityMikroOrmToPaginationBaseEntityConverterAsyncTest;

  beforeAll(() => {
    modelDbToModelConverterAsyncMock = {
      convert: jest.fn(),
    };

    baseEntityMikroOrmToPaginationBaseEntityConverterAsyncTest =
      new BaseEntityMikroOrmToPaginationBaseEntityConverterAsyncTest(modelDbToModelConverterAsyncMock);
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityMikroOrmFixtures: BaseEntityMikroOrm[];
      let paginationContext: { query: BaseEntityPaginateFindQuery; totalItems: number };
      let baseEntityFixture: BaseEntity;
      let baseEntityFixtures: BaseEntity[];
      let paginationBaseEntityFixture: Pagination<BaseEntity>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityMikroOrmFixtures = [BaseEntityMikroOrmFixtures.any];
        paginationContext = {
          query: BaseEntityPaginateFindQueryFixtures.any,
          totalItems: baseEntityMikroOrmFixtures.length,
        };
        baseEntityFixture = BaseEntityFixtures.any;
        baseEntityFixtures = [baseEntityFixture];
        paginationBaseEntityFixture = {
          items: baseEntityFixtures,
          meta: {
            currentPage: paginationContext.query.paginationOptions.page,
            itemCount: baseEntityMikroOrmFixtures.length,
            itemsPerPage: paginationContext.query.paginationOptions.limit,
            totalItems: paginationContext.totalItems,
            totalPages: Math.ceil(paginationContext.totalItems / paginationContext.query.paginationOptions.limit),
          },
        };

        modelDbToModelConverterAsyncMock.convert.mockResolvedValueOnce(baseEntityFixture);

        result = await baseEntityMikroOrmToPaginationBaseEntityConverterAsyncTest.convert(
          baseEntityMikroOrmFixtures,
          paginationContext,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call modelDbToModelConverterAsyncMock.convert()', () => {
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledTimes(baseEntityMikroOrmFixtures.length);
        for (let nthCall: number = 1; nthCall <= baseEntityMikroOrmFixtures.length; nthCall++) {
          expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenNthCalledWith(
            nthCall,
            baseEntityMikroOrmFixtures[nthCall - 1],
          );
        }
      });

      it('should return Pagination<BaseEntity>', () => {
        expect(result).toStrictEqual(paginationBaseEntityFixture);
      });
    });
  });
});
