import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { BaseEntity } from './base.entity';

export enum UserRole {
    ADMIN = 'admin',
    LOGGED = 'logged',
}

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ type: 'varchar', nullable: false }) username: string;
    @Column({ type: 'varchar', nullable: false }) password: string;
    @Column({ type: 'varchar', nullable: false, unique: true }) email: string;
    @Column({
        type: 'enum',
        nullable: false,
        enum: UserRole,
        default: UserRole.LOGGED,
    })
    role: UserRole;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
