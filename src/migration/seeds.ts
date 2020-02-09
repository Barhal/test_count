import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { UserEntity, UserRole } from '../model/user.entity';

export class Seed1581153334990 implements MigrationInterface {
  name = 'Seed1581153334990';

  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = getRepository(UserEntity).create({
      username: 'Barhal',
      password: 'BarhalPassword',
      email: 'emailTest',
      role: UserRole.ADMIN,
      createDateTime: new Date(),
      lastChangedDateTime: new Date(),
    });

    await getRepository(UserEntity).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return;
  }
}
