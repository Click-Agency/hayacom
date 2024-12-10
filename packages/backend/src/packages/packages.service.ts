import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Package } from '../db/schemas/Package.schema';
import { Model } from 'mongoose';
import { PaginateUtils } from '../shared/utils/paginate.utils';
import { PaginatedDto } from 'src/shared/dtos/paginated.dto';
import { CreatePackageDto } from './dtos/create-package.dto';
import { UpdatePackageDto } from './dtos/update-package.dto';

@Injectable()
export class PackagesService {
  public constructor(
    @InjectModel(Package.name) private readonly packageModel: Model<Package>,
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

  public async create(packageData: CreatePackageDto, userId: string) {
    try {
      // check if the user exists

      await this.packageModel.create({ ...packageData, userId });
      // status 201 is created
      return HttpStatus.CREATED;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  public async update(
    _id: string,
    packageData: UpdatePackageDto,
    userId: string,
  ) {
    try {
      const packageDoc = await this.packageModel.findOneAndUpdate(
        { _id, userId },
        { ...packageData },
        { new: true },
      );

      if (!packageDoc)
        throw new HttpException({ message: 'package not found' }, 404);

      return HttpStatus.ACCEPTED;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  public async delete(_id: string, userId: string) {
    try {
      const packageDoc = await this.packageModel.findOneAndDelete({
        _id,
        userId,
      });

      if (!packageDoc)
        throw new HttpException({ message: 'package not found' }, 404);

      return HttpStatus.ACCEPTED;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }
}
