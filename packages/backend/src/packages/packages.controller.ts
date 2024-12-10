import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { ParseObjectIdPipe } from '../shared/pipes/parse-objectId.pipe';
import { Package } from '../db/schemas/Package.schema';
import { PaginatedDto } from '../shared/dtos/paginated.dto';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CreatePackageDto } from './dtos/create-package.dto';
import { UpdatePackageDto } from './dtos/update-package.dto';

@Controller('packeges')
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
  public async createPackage(
    @Body() packageData: CreatePackageDto,
    @Request() request: { _id: string },
  ): Promise<HttpStatus> {
    return await this.packagesService.create(packageData, request._id);
  }

  @Patch(':_id')
  @UseGuards(AuthGuard)
  public async updatePackage(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Body() packageData: UpdatePackageDto,
    @Request() request: { _id: string },
  ): Promise<HttpStatus> {
    return await this.packagesService.update(_id, packageData, request._id);
  }

  @Delete(':_id')
  @UseGuards(AuthGuard)
  public async deletePackage(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Request() request: { _id: string },
  ): Promise<HttpStatus> {
    return await this.packagesService.delete(_id, request._id);
  }
}
