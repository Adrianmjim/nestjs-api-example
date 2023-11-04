import { randomUUID } from 'crypto';

import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export class BaseEntityMikroOrm {
  [OptionalProps]?: 'createdAt' | 'version';

  @Property({ name: 'created_at', onCreate: () => new Date(), type: 'datetime' })
  createdAt!: Date;

  @PrimaryKey({ name: 'id', type: 'uuid' })
  id: string = randomUUID();

  @Property({ name: 'updated_at', nullable: true, onUpdate: () => new Date(), type: 'datetime' })
  updatedAt?: Date;

  @Property({ name: 'version', version: true })
  version!: number;
}
