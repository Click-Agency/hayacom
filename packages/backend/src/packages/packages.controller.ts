import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { ParseObjectIdPipe } from '../shared/pipes/parse-objectId.pipe';
import { Package } from '../db/schemas/package.schema';
import { PaginatedDto } from '../shared/dtos/paginated.dto';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CreatePackageDto } from './dtos/create-package.dto';
import { UpdatePackageDto } from './dtos/update-package.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('packages')
export class PackagesController {
  public constructor(private packagesService: PackagesService) {}

  @Get('/')
  public async getPackagesPaginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<PaginatedDto<Package>> {
    return await this.packagesService.find(page, limit);
  }

  @Get(':_id')
  public async getPackageById(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<Package> {
    return await this.packagesService.findById(_id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('video'))
  public async createPackage(
    @Body() packageData: CreatePackageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /video\/(mp4|webm|ogg)/,
          }),
        ], // 10 MB max file size
        fileIsRequired: true,
      }),
    )
    video: Express.Multer.File,
    @Request()
    request: { _id: string },
  ): Promise<HttpStatus> {
    return await this.packagesService.create(packageData, video, request._id);
  }

  @Patch(':_id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('video'))
  public async updatePackage(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Body() packageData: UpdatePackageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /video\/(mp4|webm|ogg)/,
          }),
        ], // 10 MB max file size
        fileIsRequired: false,
      }),
    )
    video: Express.Multer.File,
  ): Promise<HttpStatus> {
    return await this.packagesService.update(_id, packageData, video);
  }

  @Delete(':_id')
  @UseGuards(AuthGuard)
  public async deletePackage(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<HttpStatus> {
    return await this.packagesService.delete(_id);
  }
}
