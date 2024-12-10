import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModel } from '../db/models/user.model';

@Module({
  imports: [UserModel],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
