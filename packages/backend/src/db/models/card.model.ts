import { Card, CardSchema } from '../schemas/card.schema';
import { MongooseModule } from '@nestjs/mongoose';

export const CardModel = MongooseModule.forFeatureAsync([
  {
    name: Card.name,
    useFactory: () => CardSchema,
  },
]);
