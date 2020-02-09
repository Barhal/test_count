import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { UserDTO } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log(user);
    if (user && (await this.passwordsAreEqual(user.password, pass))) {
      const { password, ...result } = user;
      console.log('result validateUser:' + result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('login' + user);
    const payload = { username: user.username, sub: user.id, role: 'admin' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
