import { CatSetCommand, CatUpdateOneCommand } from '@nestjs-api-example/core/commands';
import { CatFindQuery } from '@nestjs-api-example/core/queries';
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

import { UpdateOneCatGrpc } from '../model/UpdateOneCatGrpc';

@Controller()
export class UpdateOneCatGrpcController {
  public constructor(private readonly commandBud: CommandBus) {}

  @UsePipes(
    new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true }, whitelist: true }),
  )
  @GrpcMethod('CatService', 'UpdateOne')
  public async updateOne(data: UpdateOneCatGrpc): Promise<void> {
    const catUpdateOneCommand: CatUpdateOneCommand = new CatUpdateOneCommand(
      new CatFindQuery({ ids: [data.id] }),
      new CatSetCommand({ bornDate: data.bornDate, color: data.color, name: data.name }),
    );

    await this.commandBud.execute(catUpdateOneCommand);
  }
}
