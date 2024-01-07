import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CatUpdateOneCommand, CatSetCommand, CatUpdateCommand } from '@nestjs-api-example/core-cat/command';
import { CatFindQuery } from '@nestjs-api-example/core-cat/query';
import { Observable, map, mergeMap, toArray } from 'rxjs';

import { UpdateOneCatGrpc } from '../model/UpdateOneCatGrpc';

@Controller()
export class UpdateCatGrpcController {
  public constructor(private readonly commandBud: CommandBus) {}

  @GrpcMethod('CatService', 'Update')
  public updateOne(messages: Observable<UpdateOneCatGrpc>): Observable<void> {
    return messages.pipe(
      map(
        (updateOneCatGrpc: UpdateOneCatGrpc) =>
          new CatUpdateOneCommand(
            new CatFindQuery({ ids: [updateOneCatGrpc.id] }),
            new CatSetCommand({
              bornDate: updateOneCatGrpc.bornDate,
              color: updateOneCatGrpc.color,
              name: updateOneCatGrpc.name,
            }),
          ),
      ),
      toArray(),
      map((catUpdateOneCommands: CatUpdateOneCommand[]) => new CatUpdateCommand(catUpdateOneCommands)),
      mergeMap(async (catUpdateCommand: CatUpdateCommand) =>
        this.commandBud.execute<CatUpdateCommand, void>(catUpdateCommand),
      ),
    );
  }
}
