import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Request } from 'express';

export const Protocol = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log('Protocol Decorator');
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.protocol;
  },
);
