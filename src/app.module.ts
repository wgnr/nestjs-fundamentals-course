import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CoffeesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-course'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
