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
  @IsString({ each: true })
  @MinLength(2, { each: true })
  @MaxLength(256, { each: true })
  itemsEn: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  @MinLength(2, { each: true })
  @MaxLength(256, { each: true })
  itemsAr: string[];
}
