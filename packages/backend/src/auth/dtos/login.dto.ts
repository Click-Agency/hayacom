import {
  IsNotEmpty,
  IsEmail,
  Length,
  IsString,
  IsBoolean,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  //@IsStrongPassword({ minLength: 8 })
  @Length(8, 64, { message: 'Password must be between 8 or 64 characters.' })
  @IsString()
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  rememberMe: boolean;
}
