import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CatInsertOneCommand } from '@nestjs-api-example/core-cat/command';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { InsertOneCatGrpc } from '../model/InsertOneCatGrpc';

@Controller()
export class InsertOneCatGrpcController {
  public constructor(private readonly commandBus: CommandBus) {}

  @UsePipes(
    new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true }, whitelist: true }),
  )
  @GrpcMethod('CatService', 'InsertOne')
  public async insertOne(data: InsertOneCatGrpc): Promise<Cat> {
    const catInsertOneCommand: CatInsertOneCommand = new CatInsertOneCommand({
      bornDate: data.bornDate,
      color: data.color,
      name: data.name,
    });

    const cat: Cat = await this.commandBus.execute(catInsertOneCommand);

    return cat;
  }
}
