import {MigrationInterface, QueryRunner} from "typeorm";

export class test1581252848340 implements MigrationInterface {
    name = 'test1581252848340'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('admin', 'logged')`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'logged', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TYPE "users_role_enum"`, undefined);
    }

}
