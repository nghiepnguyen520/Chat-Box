import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Middleware show logs body:', req.body);
    console.log('Middleware show logs method:', req.method);
    next();
  }
}
