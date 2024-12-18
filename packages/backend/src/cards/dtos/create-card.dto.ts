import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  titleEn: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  titleAr: string;
}
