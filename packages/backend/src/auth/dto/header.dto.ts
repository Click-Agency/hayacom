import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class HeaderDto {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'authorization' })
  authorization: string;
}
