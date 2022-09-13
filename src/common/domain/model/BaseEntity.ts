export interface BaseEntity {
  createdAt: Date;
  createdById: string;
  id: string;
  updatedAt: Date | undefined;
  updatedById: string | undefined;
  version: number;
}
