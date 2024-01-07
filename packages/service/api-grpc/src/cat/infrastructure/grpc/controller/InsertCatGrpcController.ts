import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcStreamMethod } from '@nestjs/microservices';
import { CatInsertOneCommand, CatInsertCommand } from '@nestjs-api-example/core-cat/command';
import { Cat } from '@nestjs-api-example/core-entity/model';
import { Observable, map, mergeMap, toArray } from 'rxjs';

import { InsertOneCatGrpc } from '../model/InsertOneCatGrpc';

@Controller()
export class InsertCatGrpcController {
  public constructor(private readonly commandBus: CommandBus) {}

  @GrpcStreamMethod('CatService', 'Insert')
  public insert(messages: Observable<InsertOneCatGrpc>): Observable<{ items: Cat[] }> {
    return messages.pipe(
      map(
        (insertOneCatGrpc: InsertOneCatGrpc) =>
          new CatInsertOneCommand({
            bornDate: insertOneCatGrpc.bornDate,
            color: insertOneCatGrpc.color,
            name: insertOneCatGrpc.name,
          }),
      ),
      toArray(),
      map((catInsertOneCommands: CatInsertOneCommand[]) => new CatInsertCommand(catInsertOneCommands)),
      mergeMap(async (catInsertCommand: CatInsertCommand) =>
        this.commandBus.execute<CatInsertCommand, Cat[]>(catInsertCommand),
      ),
      map((cats: Cat[]) => ({ items: cats })),
    );
  }
}
