import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { UserDTO } from '../dto/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
    ) { }

    public async getAll(): Promise<UserDTO[] | undefined> {
        return;
    }

    public async findOne(username): Promise<UserDTO> {
        return this.repo.findOne({email: username})
            .then(u => UserDTO.fromEntity(u));
    }
}
