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

    public async getAll(): Promise<UserDTO[]> {
        return await this.repo.find()
            .then(items => items.map(e => UserDTO.fromEntity(e)));
    }

    public async findOne(username): Promise<UserDTO> {
        return this.repo.findOne({email: username})
            .then(u => UserDTO.fromEntity(u));
    }

    public async create(dto: UserDTO): Promise<UserDTO> {
        console.log(dto);
        console.log(UserDTO.from(dto).toEntity());
        return this.repo.save(UserDTO.from(dto).toEntity())
            .then(elem => UserDTO.fromEntity(elem));
    }

    public async update(dto: UserDTO): Promise<UserDTO> {
        const user = await this.repo.findOne({ id: dto.id})
            .then(e => UserDTO.fromEntity(e));
        console.log(user);
        user.username = dto.username;
        user.password = dto.password;
        user.email = dto.email;
        return this.repo.save(UserDTO.from(user).toEntity())
            .then(e => UserDTO.fromEntity(e));
    }
}
