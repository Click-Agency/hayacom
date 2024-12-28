import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardModel } from '../db/models/card.model';

@Module({
  imports: [CardModel],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
