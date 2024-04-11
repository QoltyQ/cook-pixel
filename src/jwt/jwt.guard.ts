import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, 'secret-key'); // Verify token with your secret key
        request.user = decoded; // Attach decoded data to request object
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }
}
