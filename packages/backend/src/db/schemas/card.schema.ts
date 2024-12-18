import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({
    required: true,
    unique: true,
    minlength: [2, 'Custom ID is too short.'],
    maxlength: [64, 'Custom ID is too long.'],
  })
  customIdEn: string;

  @Prop({
    required: true,
    unique: true,
    minlength: [2, 'Custom ID is too short.'],
    maxlength: [64, 'Custom ID is too long.'],
  })
  customIdAr: string;

  @Prop({
    required: true,
    minlength: [2, 'Title is too short.'],
    maxlength: [64, 'Title is too long.'],
  })
  titleEn: string;

  @Prop({
    required: true,
    minlength: [2, 'Title is too short.'],
    maxlength: [64, 'Title is too long.'],
  })
  titleAr: string;

  @Prop({
    required: true,
    match: [
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      'Invalid URL.',
    ],
  })
  image: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);
