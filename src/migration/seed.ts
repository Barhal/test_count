import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { UserEntity } from "../model/user.entity";

export class SeedUserRecord1563611829371 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = getRepository(UserEntity).create({
      username: "bhaidar",
      password: "v%re$1%3432F",
      email: "test"
    });

    await getRepository(UserEntity).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return;
  }
}
