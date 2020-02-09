import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller()
@UseGuards(RolesGuard)
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log('login');
    // console.log(req);
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Roles('admin')
  getHello(): string {
    return this.appService.getHello();
  }
}
