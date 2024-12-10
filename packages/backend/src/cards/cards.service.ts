import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from '../db/schemas/Card.schema';
import { Model } from 'mongoose';
import { PaginateUtils } from '../shared/utils/paginate.utils';
import { PaginatedDto } from 'src/shared/dtos/paginated.dto';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';

@Injectable()
export class CardsService {
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

      if (!cardDoc)
        throw new HttpException({ message: 'card not found' }, 404);

      return cardDoc.toObject({ versionKey: false });
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  public async create(cardData: CreateCardDto, userId: string) {
    try {
      // check if the user exists

      await this.cardModel.create({ ...cardData, userId });
      // status 201 is created
      return HttpStatus.CREATED;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  public async update(
    _id: string,
    cardData: UpdateCardDto,
    userId: string,
  ) {
    try {
      const cardDoc = await this.cardModel.findOneAndUpdate(
        { _id, userId },
        { ...cardData },
        { new: true },
      );

      if (!cardDoc)
        throw new HttpException({ message: 'card not found' }, 404);

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

      if (!cardDoc)
        throw new HttpException({ message: 'card not found' }, 404);

      return HttpStatus.ACCEPTED;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }
}
