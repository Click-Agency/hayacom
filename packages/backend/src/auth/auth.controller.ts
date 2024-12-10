import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { Cookies } from '../shared/decorators/cookies.decorator';
import { RequestHeader } from './pipes/request-header';
import { HeaderDto } from './dto/header.dto';

@Controller('auth')
export class AuthController {
  public constructor(private authService: AuthService) {}

  @Post('register')
  public async register(@Body() userData: RegisterDto) {
    await this.authService.register(userData);
  }

  @Post('login')
  public async login(@Res() res: Response, @Body() userData: LoginDto) {
    return this.authService.login(res, userData);
  }

  @Get('refresh')
  public async refresh(
    @Cookies('x-refresh-token') refreshToken: string,
    @RequestHeader(
      new ValidationPipe({ whitelist: true, validateCustomDecorators: true }),
    )
    header: HeaderDto,
    @Res() res: Response,
  ) {
    return this.authService.refresh(res, header, refreshToken);
  }
}
