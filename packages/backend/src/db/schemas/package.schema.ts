import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PackageDocument = HydratedDocument<Package>;

@Schema()
export class Package {
  @Prop({
    required: true,
    unique: true,
    minlength: [2, 'Title is too short.'],
    maxlength: [64, 'Title is too long.'],
  })
  title: string;

  @Prop({
    required: true,
    minlength: [2, 'Item description is too short.'],
    maxlength: [256, 'Item description is too long.'],
  })
  items: string[];

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
