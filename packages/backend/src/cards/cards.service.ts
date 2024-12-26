import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from '../db/schemas/Card.schema';
import { Model } from 'mongoose';
import { PaginateUtils } from '../shared/utils/paginate.utils';
import { PaginatedDto } from 'src/shared/dtos/paginated.dto';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';
import { S3BucketService } from 'src/s3Bucket/s3Bucket.service';

@Injectable()
export class CardsService {
  public constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
    private readonly s3Bucket: S3BucketService,
  ) {}

  public async find(page: number, limit: number) {
    try {
      const cardsDoc = await this.cardModel
        .find()
        .limit(limit)
        .skip(limit * (page - 1))
        .exec();

      if (!cardsDoc.length)
        throw new HttpException({ message: 'no cards found' }, 404);

      const itemCount = await this.cardModel.countDocuments();

      const paginateUtils = PaginateUtils.getInstance();

      return new PaginatedDto<Card>(
        cardsDoc.map(paginateUtils.convert),
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
      const cardDoc = await this.cardModel.findOne({ _id }).exec();

      if (!cardDoc) throw new HttpException({ message: 'card not found' }, 404);

      return cardDoc.toObject({ versionKey: false });
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  public async create(
    cardData: CreateCardDto,
    imagesData: Express.Multer.File[],
    userId: string,
  ) {
    try {
      const images = await this.s3Bucket.uploadImages(imagesData);

      await this.cardModel.create({ ...cardData, images, userId });

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
    cardData: UpdateCardDto,
    imagesData?: Express.Multer.File[],
  ) {
    try {
      const cardDoc = await this.cardModel.findOne({ _id }).exec();

      //arrray of files [file1, file2, file3]

      

      if (!cardDoc) throw new HttpException({ message: 'card not found' }, 404);

      if (imagesData) {
        // const deleteCommand = new DeleteObjectCommand({
        //   Bucket: process.env.AWS_S3_BUCKET_NAME,
        //   Key: `images/${cardDoc.toObject().image.split('/').slice(-1)[0]}`,
        // });
        // await this.s3Client.send(deleteCommand);
        // const Key = `images/${Date.now()}-${imageData.originalname}`;
        // const putCommand = new PutObjectCommand({
        //   Bucket: process.env.AWS_S3_BUCKET_NAME,
        //   Key,
        //   Body: imageData.buffer,
        //   ContentType: imageData.mimetype,
        // });
        // await this.s3Client.send(putCommand);
        // const image = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${Key}`;
        // await this.cardModel.updateOne({ _id, userId }, { ...cardData, image });
      } else {
        await this.cardModel.updateOne({ _id }, { ...cardData });
      }

      return HttpStatus.ACCEPTED;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  public async delete(_id: string) {
    try {
      const cardDoc = await this.cardModel.findOne({ _id }).exec();

      if (!cardDoc) throw new HttpException({ message: 'card not found' }, 404);

      const images = cardDoc.toObject().images;

      await this.s3Bucket.deleteImages(images);

      await this.cardModel.deleteOne({ _id });

      return HttpStatus.ACCEPTED;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }
}
