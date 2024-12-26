import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Package } from '../db/schemas/Package.schema';
import { Model } from 'mongoose';
import { PaginateUtils } from '../shared/utils/paginate.utils';
import { PaginatedDto } from 'src/shared/dtos/paginated.dto';
import { CreatePackageDto } from './dtos/create-package.dto';
import { UpdatePackageDto } from './dtos/update-package.dto';
import { S3BucketService } from 'src/s3Bucket/s3Bucket.service';

@Injectable()
export class PackagesService {
  public constructor(
    @InjectModel(Package.name) private readonly packageModel: Model<Package>,
    private readonly s3Bucket: S3BucketService,
  ) {}

  public async find(page: number, limit: number) {
    try {
      const packagesDoc = await this.packageModel
        .find()
        .limit(limit)
        .skip(limit * (page - 1))
        .exec();

      if (!packagesDoc.length)
        throw new HttpException({ message: 'no packages found' }, 404);

      const itemCount = await this.packageModel.countDocuments();

      const paginateUtils = PaginateUtils.getInstance();

      return new PaginatedDto<Package>(
        packagesDoc.map(paginateUtils.convert),
        page,
        limit,
        itemCount,
      );
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  public async findById(_id: string) {
    try {
      const packageDoc = await this.packageModel.findOne({ _id }).exec();

      if (!packageDoc)
        throw new HttpException({ message: 'package not found' }, 404);

      return packageDoc.toObject({ versionKey: false });
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  public async create(
    packageData: CreatePackageDto,
    videoData: Express.Multer.File,
    userId: string,
  ) {
    try {
      // check if the user exists

      const itemsEn = packageData.itemsEn.split('$/');
      const itemsAr = packageData.itemsAr.split('$/');

      const video = await this.s3Bucket.uploadVideo(videoData);

      await this.packageModel.create({
        ...packageData,
        itemsEn,
        itemsAr,
        video,
        userId,
      });

      return HttpStatus.CREATED;
    } catch (err) {
      if (err instanceof Error && 'code' in err && err.code === 11000)
        throw new HttpException({ message: 'package is already exists' }, 409);
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  public async update(
    _id: string,
    packageData: UpdatePackageDto,
    videoData?: Express.Multer.File,
  ) {
    try {
      const packageDoc = await this.packageModel.findOne({ _id }).exec();

      if (!packageDoc)
        throw new HttpException({ message: 'package not found' }, 404);

      const itemsEn = packageData.itemsEn.split('$/');
      const itemsAr = packageData.itemsAr.split('$/');

      if (videoData) {
        await this.s3Bucket.deleteVideo(packageDoc.toObject().video);

        const video = await this.s3Bucket.uploadVideo(videoData);

        await this.packageModel.updateOne(
          { _id },
          { ...packageData, itemsEn, itemsAr, video },
        );
      } else {
        await this.packageModel.updateOne(
          { _id },
          { ...packageData, itemsEn, itemsAr },
        );
      }
      return HttpStatus.ACCEPTED;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  public async delete(_id: string) {
    try {
      const packageDoc = await this.packageModel.findOne({ _id }).exec();

      if (!packageDoc)
        throw new HttpException({ message: 'package not found' }, 404);

      await this.s3Bucket.deleteVideo(packageDoc.toObject().video);

      await this.packageModel.deleteOne({ _id });

      return HttpStatus.ACCEPTED;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }
}
