import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/jwt.constants';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
