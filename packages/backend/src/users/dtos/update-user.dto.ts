import { IsEmpty, IsOptional, Length } from 'class-validator';
import { RegisterDto } from '../../auth/dtos/register.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(RegisterDto) {
  @IsEmpty()
  email: string;

  @IsOptional()
  @Length(8, 64, { message: 'Password must be between 8 or 64 characters.' })
  password: string;

  @IsOptional()
  @Length(8, 64, { message: 'Password must be between 8 or 64 characters.' })
  newPassword: string;
}
