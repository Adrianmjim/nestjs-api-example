import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcStreamMethod } from '@nestjs/microservices';
import { CatInsertOneCommand } from '@nestjs-api-example/core-cat/command';
import { Cat } from '@nestjs-api-example/core-entity/model';
import { Observable, map, mergeMap } from 'rxjs';

import { InsertOneCatGrpc } from '../model/InsertOneCatGrpc';

@Controller()
export class InsertOneStreamCatGrpcController {
  public constructor(private readonly commandBus: CommandBus) {}

  @GrpcStreamMethod('CatService', 'InsertOneStream')
  public insertOneStream(messages: Observable<InsertOneCatGrpc>): Observable<Cat> {
    return messages.pipe(
      map(
        (insertOneCatGrpc: InsertOneCatGrpc) =>
          new CatInsertOneCommand({
            bornDate: insertOneCatGrpc.bornDate,
            color: insertOneCatGrpc.color,
            name: insertOneCatGrpc.name,
          }),
      ),
      mergeMap(async (catInsertOneCommand: CatInsertOneCommand) =>
        this.commandBus.execute<CatInsertOneCommand, Cat>(catInsertOneCommand),
      ),
    );
  }
}
