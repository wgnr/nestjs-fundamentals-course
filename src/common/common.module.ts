import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { CoffeesController } from '../coffees/coffees.controller';
import { ApiKeyGuard } from './guard/api-key.guard';
import {
  FunctionalLoggingMiddleware,
  LoggingMiddleware,
} from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer.apply(FunctionalLoggingMiddleware).forRoutes(CoffeesController);
  }
}
