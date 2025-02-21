import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PackageDocument = HydratedDocument<Package>;

@Schema()
export class Package {
  @Prop({
    required: true,
    unique: true,
    minlength: [2, 'Title is too short.'],
    maxlength: [25, 'Title is too long.'],
  })
  nameEn: string;

  @Prop({
    required: true,
    unique: true,
    minlength: [2, 'Title is too short.'],
    maxlength: [25, 'Title is too long.'],
  })
  nameAr: string;

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
    minlength: [2, 'Item description is too short.'],
    maxlength: [256, 'Item description is too long.'],
  })
  itemsEn: string[];

  @Prop({
    required: true,
    minlength: [2, 'Item description is too short.'],
    maxlength: [256, 'Item description is too long.'],
  })
  itemsAr: string[];

  @Prop({
    required: true,
  })
  video: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;

  @Prop({
    required: true,
    validate: {
      validator: (v: { guests: number; price: number }[]) =>
        v.length > 0 || v.every((i) => i.guests && i.price),
      message: 'Price must have at least one item.',
    },
  })
  prices: { guests: number; price: number }[];
}

export const PackageSchema = SchemaFactory.createForClass(Package);
