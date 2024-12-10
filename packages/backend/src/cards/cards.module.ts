import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardModel } from '../db/models/card.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CardModel],
  controllers: [CardsController],
  providers: [CardsService, JwtService],
})
export class CardsModule {}
