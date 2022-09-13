import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { InsertTypeOrmAdapter } from '../../../../common/integration/typeOrm/adapter/InsertTypeOrmAdapter';
import { FoodInsertCommand } from '../../../domain/command/FoodInsertCommand';
import { Food } from '../../../domain/model/Food';
import { FoodInsertCommandToFoodInsertQueryTypeOrmConverter } from '../converter/FoodInsertCommandToFoodInsertQueryTypeOrmConverter';
import { FoodTypeOrmToFoodConverter } from '../converter/FoodTypeOrmToFoodConverter';
import { FoodTypeOrm } from '../model/FoodTypeOrm';

@Injectable()
export class InsertFoodTypeOrmAdapter extends InsertTypeOrmAdapter<Food, FoodTypeOrm, FoodInsertCommand> {
  public constructor(
    @InjectRepository(FoodTypeOrm) repository: Repository<FoodTypeOrm>,
    @Inject(FoodTypeOrmToFoodConverter) foodTypeOrmToFoodConverter: Converter<FoodTypeOrm, Food>,
    @Inject(FoodInsertCommandToFoodInsertQueryTypeOrmConverter)
    foodInsertCommandToFoodInsertQueryTypeOrmConverter: Converter<FoodInsertCommand, DeepPartial<FoodTypeOrm>>,
  ) {
    super(repository, foodTypeOrmToFoodConverter, foodInsertCommandToFoodInsertQueryTypeOrmConverter);
  }
}
