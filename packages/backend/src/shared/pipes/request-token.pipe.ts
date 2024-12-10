import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const RequestToken = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Unauthorized access');
    }

    const bearer = authorization.split(' ');

    if (bearer.length !== 2 || bearer[0]?.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException('Unauthorized access');
    }

    const token = bearer[1];
    return token;
  },
);
