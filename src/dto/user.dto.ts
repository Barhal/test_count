import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { isString } from 'util';
import { UserEntity } from '../model/user.entity';

export class UserDTO implements Readonly<UserDTO> {
    @ApiProperty({ required: true })
    @IsUUID()
    id: string;

    @ApiProperty({ required: true})
    @IsString()
    username: string;

    @ApiProperty({ required: true })
    @IsString()
    email: string;

    @ApiProperty({required: true})
    @IsString()
    password: string;

    public static from(dto: Partial<UserDTO>) {
        const it = new UserDTO();
        console.log('it' + dto.username);
        it.id = dto.id;
        it.username = dto.username;
        it.email = dto.email;
        it.password = dto.password;
        return it;
    }

    public static fromEntity(entity: UserEntity) {
        return this.from({
            id: entity.id,
            username: entity.username,
            email: entity.email,
            password: entity.password,
        });
    }

    public toEntity() {
        const it = new UserEntity();
        it.id = this.id;
        it.username = this.username;
        it.password = this.password;
        it.email = this.email;
        it.createDateTime = new Date();
        it.lastChangedDateTime = new Date();
        return it;
    }
}
