import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';

@Module({
  imports: [],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
