import { Global, Module } from '@nestjs/common';
import { S3BucketService } from './s3Bucket.service';

@Global()
@Module({
  providers: [S3BucketService],
  exports: [S3BucketService],
})
export class S3BucketModule {}
