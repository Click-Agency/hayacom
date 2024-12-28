import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { PackageModel } from '../db/models/package.model';

@Module({
  imports: [PackageModel],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
