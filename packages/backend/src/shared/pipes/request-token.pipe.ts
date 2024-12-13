import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';

export const RequestToken = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new HttpException('old access token not provided', 404);
    }

    const bearer = authorization.split(' ');

    if (bearer.length !== 2 || bearer[0]?.toLowerCase() !== 'bearer') {
      throw new HttpException('old access token not provided', 404);
    }

    const token = bearer[1];
    return token;
  },
);
