import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { PackagesModule } from './packages/packages.module';
import { CardsModule } from './cards/cards.module';
import { S3BucketModule } from './s3Bucket/s3Bucket.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DBModule,
    AuthModule,
    PackagesModule,
    CardsModule,
    S3BucketModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
