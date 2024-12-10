import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getInit(@Res() res: Response) {
    res.status(200).send('server is running').end();
  }
}
