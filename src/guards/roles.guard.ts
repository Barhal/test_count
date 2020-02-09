import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const util = require('util');
        const request = context.switchToHttp().getRequest();
        let token = request.body.token || request.query.token || request.headers['x-access-token'] || request.headers.authorization;
        if (token) {
            token = token.replace('Bearer ', '');
            request.decode = this.jwtService.decode(token);
            console.log('decrypt', util.inspect(request.decode));
            if (roles.find(elem => elem === request.decode.role)) {
                console.log('in true we are');
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}
