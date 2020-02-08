import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
    console.log(this);
  }
  // If the validation succeeds, the validate() method returns the user record. Otherwise, it returns null.
  async validate(username: string, password: string): Promise<any> {
    console.log(username + ' ' + password);
    const user = await this.authService.validateUser(username, password);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
