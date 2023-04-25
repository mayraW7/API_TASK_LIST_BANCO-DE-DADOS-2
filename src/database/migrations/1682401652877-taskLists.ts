import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskLists1682401652877 implements MigrationInterface {
    name = 'TaskLists1682401652877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasklist2"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(30) NOT NULL, "email" character varying(30) NOT NULL, "cpf" bigint NOT NULL, "pass" character varying(10) NOT NULL, "dthr_cadastro" TIMESTAMP NOT NULL DEFAULT now(), "dthr_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasklist2"."tasks" ("id" uuid NOT NULL, "description" character varying NOT NULL, "detailing" character varying NOT NULL, "filed" boolean NOT NULL DEFAULT false, "dthr_cadastro" TIMESTAMP NOT NULL DEFAULT now(), "dthr_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), "id_user" uuid NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasklist2"."tasks" ADD CONSTRAINT "FK_44fe0c59b0e8f8077b1d9c27f75" FOREIGN KEY ("id_user") REFERENCES "tasklist2"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasklist2"."tasks" DROP CONSTRAINT "FK_44fe0c59b0e8f8077b1d9c27f75"`);
        await queryRunner.query(`DROP TABLE "tasklist2"."tasks"`);
        await queryRunner.query(`DROP TABLE "tasklist2"."user"`);
    }

}
