import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../db/schemas/user.schema';
import { hash, compare } from 'bcrypt';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { Response } from 'express';
import { RolesEnum } from '../shared/decorators/roles.decorator';

@Injectable()
export class AuthService {
  public constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async register(userData: RegisterDto) {
    try {
      userData.password = await hash(userData.password, 10);

      await this.userModel.create(userData);

      return HttpStatus.CREATED;
    } catch (err) {
      if (err instanceof Error && 'code' in err && err.code === 11000)
        throw new HttpException({ message: 'user is already exists' }, 409);

      throw new HttpException({ message: 'something went wrong' }, 500);
    }
  }

  public async login(res: Response, userData: LoginDto) {
    try {
      const userDoc = await this.userModel.findOne(
        { email: userData.email },
        { password: 1, email: 1, name: 1, role: 1, _id: 1 },
      );

      const ok = await compare(userData.password, userDoc.password);

      if (!userDoc || !ok)
        throw new HttpException({ message: 'invalid credentials' }, 403);

      const user = userDoc.toObject();
      delete user.password;

      const payload = { _id: user._id, email: user.email, role: user.role };

      res.cookie(
        'x-hayacom-token',
        this.jwtService.sign(payload, {
          expiresIn: process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRES_IN,
          secret: process.env.JWT_SECRET_REFRESH_TOKEN,
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          expires: userData.rememberMe
            ? new Date(Date.now() + 60 * 60 * 24 * 7 * 1000)
            : undefined,

          maxAge: userData.rememberMe ? 60 * 60 * 24 * 7 * 1000 : undefined,
        },
      );

      res.header(
        'authorization',
        `bearer ${this.jwtService.sign(payload, {
          expiresIn: process.env.JWT_SECRET_ACCESS_TOKEN_EXPIRES_IN,
          secret: process.env.JWT_SECRET_ACCESS_TOKEN,
        })}`,
      );

      res
        .send({
          message: 'success',
          user,
        })
        .end();
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'invalid credentials' }, 403);
    }
  }

  public async refresh(res: Response, token: string, refreshToken: string) {
    try {
      const ok = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_TOKEN,
      });

      if (!ok) throw new HttpException({ message: 'invalid token' }, 403);

      const refreshTokenPayload = this.jwtService.decode(refreshToken) as {
        _id?: string;
        email?: string;
        role?: RolesEnum;
      };

      const accessTokenPayload = this.jwtService.decode(token) as {
        _id?: string;
        email?: string;
        role?: RolesEnum;
      };

      if (
        refreshTokenPayload?._id !== accessTokenPayload?._id ||
        refreshTokenPayload?.email !== accessTokenPayload?.email ||
        refreshTokenPayload?.role !== accessTokenPayload?.role
      )
        throw new HttpException({ message: 'invalid token' }, 403);

      res.header(
        'authorization',
        `bearer ${this.jwtService.sign(
          {
            _id: refreshTokenPayload._id,
            email: refreshTokenPayload.email,
            role: refreshTokenPayload.role,
          },
          {
            expiresIn: process.env.JWT_SECRET_ACCESS_TOKEN_EXPIRES_IN,
            secret: process.env.JWT_SECRET_ACCESS_TOKEN,
          },
        )}`,
      );

      res.sendStatus(200).end();
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'bad request' }, 400);
    }
  }

  public async revokeRefresh(res: Response) {
    try {
      res.clearCookie('x-hayacom-token');

      res.sendStatus(200).end();
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'bad request' }, 400);
    }
  }
}
