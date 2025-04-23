import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { decodeAccessToken } from '@/utils'; // Assuming you have a utility function for decoding the token

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Access token not found');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = decodeAccessToken(token); // Decode the token
      request.user = decoded; // Store the decoded user info in the request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}