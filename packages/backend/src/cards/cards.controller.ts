import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { ParseObjectIdPipe } from '../shared/pipes/parse-objectId.pipe';
import { Card } from '../db/schemas/Card.schema';
import { PaginatedDto } from '../shared/dtos/paginated.dto';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';

@Controller('cards')
export class CardsController {
  public constructor(private cardsService: CardsService) {}

  @Get('/')
  public async getCardsPaginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<PaginatedDto<Card>> {
    return await this.cardsService.find(page, limit);
  }

  @Get(':_id')
  public async getCardById(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<Card> {
    return await this.cardsService.findById(_id);
  }

  @Post()
  @UseGuards(AuthGuard)
  public async createCard(
    @Body() cardData: CreateCardDto,
    @Request() request: { _id: string },
  ): Promise<HttpStatus> {
    return await this.cardsService.create(cardData, request._id);
  }

  @Patch(':_id')
  @UseGuards(AuthGuard)
  public async updateCard(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Body() cardData: UpdateCardDto,
    @Request() request: { _id: string },
  ): Promise<HttpStatus> {
    return await this.cardsService.update(_id, cardData, request._id);
  }

  @Delete(':_id')
  @UseGuards(AuthGuard)
  public async deleteCard(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Request() request: { _id: string },
  ): Promise<HttpStatus> {
    return await this.cardsService.delete(_id, request._id);
  }
}
