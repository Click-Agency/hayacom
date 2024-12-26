import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  customIdEn: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  customIdAr: string;
}
