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
    type: [String],
    validate: {
      validator: (v: string[]) => v.length > 0,
      message: 'At least one image is required.',
    },
    validateAll: {
      validator: (v: string[]) =>
        v.every((i) => /\.(jpe?g|png|gif|bmp)$/i.test(i)),
      message: 'Invalid image format.',
    },
  })
  images: string[];

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);
