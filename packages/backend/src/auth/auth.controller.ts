import { AuthGuard } from './../shared/guard/auth.guard';
import { Body, Controller, Delete, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { Response } from 'express';
import { Cookies } from '../shared/decorators/cookies.decorator';
import { RequestToken } from '../shared/pipes/request-token.pipe';

@Controller('auth')
export class AuthController {
  public constructor(private authService: AuthService) {}

  @Post('register')
  @UseGuards(AuthGuard)
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
    @RequestToken() token: string,
    @Res() res: Response,
  ) {
    return this.authService.refresh(res, token, refreshToken);
  }

  @Delete('refresh')
  public async revokeRefresh(@Res() res: Response) {
    return this.authService.revokeRefresh(res);
  }
}
