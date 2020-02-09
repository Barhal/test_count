import { Controller, Post, Body, Put, UseGuards, Get } from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    public async getAll() {
        return await this.usersService.getAll();
    }

    @Post()
    @ApiOperation({ summary: 'Signup an user' })
    @ApiResponse({
        status: 200,
        description: 'User created',
        type: UserDTO,
    })
    public async create(@Body() userDTO: UserDTO): Promise<UserDTO> {
        return this.usersService.create(userDTO);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    @ApiOperation({ summary: 'Modify an user' })
    public async modifyUser(@Body() userDTO: UserDTO): Promise<UserDTO> {
        return this.usersService.update(userDTO);
    }
}
