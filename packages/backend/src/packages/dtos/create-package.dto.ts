import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  title: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @MinLength(2, { each: true })
  @MaxLength(256, { each: true })
  items: string[];
}
