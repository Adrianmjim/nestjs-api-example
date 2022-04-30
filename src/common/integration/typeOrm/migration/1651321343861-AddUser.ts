import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUser1651321343861 implements MigrationInterface {
    name = 'AddUser1651321343861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("age" integer NOT NULL, "email" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "surname" character varying NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Cat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "age" integer NOT NULL, "breed" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_09b9d79f55148010f240d6d9a35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Cat" ADD CONSTRAINT "FK_3a13bd834949d017dd157245da3" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Cat" DROP CONSTRAINT "FK_3a13bd834949d017dd157245da3"`);
        await queryRunner.query(`DROP TABLE "Cat"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }
}
