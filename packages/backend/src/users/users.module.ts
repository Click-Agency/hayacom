import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserModel } from '../db/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [UserModel],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [JwtService],
})
export class UsersModule {}
