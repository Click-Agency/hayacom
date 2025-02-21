import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  nameEn: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  nameAr: string;

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

  @IsNotEmpty()
  @IsString()
  itemsEn: string;

  @IsNotEmpty()
  @IsString()
  itemsAr: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  prices: string;
}
