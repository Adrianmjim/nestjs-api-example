import { MigrationInterface, QueryRunner } from 'typeorm';

export class Add1651686319866 implements MigrationInterface {
  name = 'Add1651686319866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "Purchase" ("date" TIMESTAMP NOT NULL, "id" SERIAL NOT NULL, "prize" integer NOT NULL, "foodId" integer, "userId" uuid, CONSTRAINT "PK_6d9e6d272ab44bae1cbd7d3d18b" PRIMARY KEY ("id"))',
    );
    await queryRunner.query('ALTER TABLE "Cat" DROP CONSTRAINT "FK_7cf4951844ab78d0bdcb2b99fad"');
    await queryRunner.query('ALTER TABLE "Food" DROP CONSTRAINT "PK_cdf31e5844e22be160e934e87ea"');
    await queryRunner.query('ALTER TABLE "Food" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "Food" ADD "id" SERIAL NOT NULL');
    await queryRunner.query('ALTER TABLE "Food" ADD CONSTRAINT "PK_cdf31e5844e22be160e934e87ea" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "Cat" DROP COLUMN "favouriteFoodId"');
    await queryRunner.query('ALTER TABLE "Cat" ADD "favouriteFoodId" integer');
    await queryRunner.query(
      'ALTER TABLE "Cat" ADD CONSTRAINT "FK_7cf4951844ab78d0bdcb2b99fad" FOREIGN KEY ("favouriteFoodId") REFERENCES "Food"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "Purchase" ADD CONSTRAINT "FK_146845222732a453c8f8c24fc57" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "Purchase" ADD CONSTRAINT "FK_3f23b57500b63b8dfe1c86e316d" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Purchase" DROP CONSTRAINT "FK_3f23b57500b63b8dfe1c86e316d"');
    await queryRunner.query('ALTER TABLE "Purchase" DROP CONSTRAINT "FK_146845222732a453c8f8c24fc57"');
    await queryRunner.query('ALTER TABLE "Cat" DROP CONSTRAINT "FK_7cf4951844ab78d0bdcb2b99fad"');
    await queryRunner.query('ALTER TABLE "Cat" DROP COLUMN "favouriteFoodId"');
    await queryRunner.query('ALTER TABLE "Cat" ADD "favouriteFoodId" uuid');
    await queryRunner.query('ALTER TABLE "Food" DROP CONSTRAINT "PK_cdf31e5844e22be160e934e87ea"');
    await queryRunner.query('ALTER TABLE "Food" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "Food" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query('ALTER TABLE "Food" ADD CONSTRAINT "PK_cdf31e5844e22be160e934e87ea" PRIMARY KEY ("id")');
    await queryRunner.query(
      'ALTER TABLE "Cat" ADD CONSTRAINT "FK_7cf4951844ab78d0bdcb2b99fad" FOREIGN KEY ("favouriteFoodId") REFERENCES "Food"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('DROP TABLE "Purchase"');
  }
}
