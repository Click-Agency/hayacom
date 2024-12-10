import { Card, CardSchema } from '../schemas/Card.schema';
import { MongooseModule } from '@nestjs/mongoose';

export const CardModel = MongooseModule.forFeatureAsync([
  {
    name: Card.name,
    useFactory: () => CardSchema,
  },
]);
