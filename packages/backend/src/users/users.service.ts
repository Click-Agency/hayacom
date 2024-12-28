import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../db/schemas/user.schema';
import { ParseObjectIdPipe } from '../shared/pipes/parse-objectId.pipe';
import { UpdateUserDto } from './dtos/update-user.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findMe(_id: ParseObjectIdPipe): Promise<User> {
    try {
      const userDoc = await this.userModel
        .findOne({ _id }, { password: 0 })
        .exec();

      if (!userDoc) throw new HttpException({ message: 'user not found' }, 404);

      return userDoc.toObject({ versionKey: false });
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  async updateMe(_id: ParseObjectIdPipe, updatedUserData: UpdateUserDto) {
    try {
      // Check if the user is trying to update the password
      if (updatedUserData?.password && updatedUserData?.newPassword) {
        const userDoc = await this.userModel
          .findOne({ _id }, { password: 1 })
          .exec();

        if (!userDoc)
          throw new HttpException({ message: 'user not found' }, 404);

        const isPasswordMatch = await compare(
          updatedUserData.newPassword,
          userDoc.password,
        );

        if (isPasswordMatch)
          throw new HttpException(
            { message: 'new password is the same as the old password' },
            400,
          );

        updatedUserData.newPassword = await hash(
          updatedUserData.newPassword,
          10,
        );
        updatedUserData.password = updatedUserData.newPassword;
        delete updatedUserData.newPassword;
      } else if (updatedUserData?.password && !updatedUserData?.newPassword) {
        throw new HttpException({ message: 'new password is required' }, 400);
      } else if (!updatedUserData?.password && updatedUserData?.newPassword) {
        throw new HttpException({ message: 'password is required' }, 400);
      }

      const userDoc = await this.userModel.findOneAndUpdate(
        { _id },
        { ...updatedUserData, _id },
        { new: true },
      );

      if (!userDoc) throw new HttpException({ message: 'user not found' }, 404);

      return HttpStatus.CREATED;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  async deleteMe(_id: ParseObjectIdPipe) {
    try {
      const userDoc = await this.userModel.findOneAndDelete({ _id }).exec();

      if (!userDoc) throw new HttpException({ message: 'user not found' }, 404);

      return HttpStatus.NO_CONTENT;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }
}
