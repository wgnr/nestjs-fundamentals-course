import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware<Request, Response> {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('LoggingMiddleware');
    console.time('LoggingMiddleware');

    res.on('finish', () => console.timeEnd('LoggingMiddleware'));
    next();
  }
}

export const FunctionalLoggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('LoggingMiddleware');
  console.time('LoggingMiddleware');

  res.on('finish', () => console.timeEnd('LoggingMiddleware'));
  next();
};
