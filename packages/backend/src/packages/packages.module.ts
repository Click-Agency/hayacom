import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { PackageModel } from '../db/models/package.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PackageModel],
  controllers: [PackagesController],
  providers: [PackagesService, JwtService],
})
export class PackagesModule {}
