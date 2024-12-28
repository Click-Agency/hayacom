import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../shared/guard/auth.guard';
import { ParseObjectIdPipe } from '../shared/pipes/parse-objectId.pipe';
import { User } from '../db/schemas/user.schema';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(
    @Request()
    request: {
      _id: ParseObjectIdPipe;
    },
  ): Promise<User> {
    return await this.usersService.findMe(request._id);
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  async patchMe(
    @Request()
    request: {
      _id: ParseObjectIdPipe;
    },
    @Body() user: UpdateUserDto,
  ): Promise<HttpStatus> {
    return await this.usersService.updateMe(request._id, user);
  }

  @Delete('me')
  @UseGuards(AuthGuard)
  async deleteMe(
    @Request()
    request: {
      _id: ParseObjectIdPipe;
    },
  ): Promise<HttpStatus> {
    return await this.usersService.deleteMe(request._id);
  }
}
