import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from '../db/schemas/Card.schema';
import { Model } from 'mongoose';
import { PaginateUtils } from '../shared/utils/paginate.utils';
import { PaginatedDto } from 'src/shared/dtos/paginated.dto';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class CardsService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
  });

  public constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
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
    imageData: Express.Multer.File,
    userId: string,
  ) {
    try {
      const Key = `images/${Date.now()}-${imageData.originalname}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key,
        Body: imageData.buffer,
        ContentType: imageData.mimetype,
      });

      await this.s3Client.send(command);

      const image = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${Key}`;

      await this.cardModel.create({ ...cardData, image, userId });

      return HttpStatus.CREATED;
    } catch (err) {
      if (err instanceof Error && 'code' in err && err.code === 11000)
        throw new HttpException({ message: 'package is already exists' }, 409);
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  public async update(_id: string, cardData: UpdateCardDto, userId: string) {
    try {
      const cardDoc = await this.cardModel.findOneAndUpdate(
        { _id, userId },
        { ...cardData },
        { new: true },
      );

      if (!cardDoc) throw new HttpException({ message: 'card not found' }, 404);

      return HttpStatus.ACCEPTED;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  public async delete(_id: string, userId: string) {
    try {
      const cardDoc = await this.cardModel.findOneAndDelete({
        _id,
        userId,
      });

      if (!cardDoc) throw new HttpException({ message: 'card not found' }, 404);

      return HttpStatus.ACCEPTED;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }
}
