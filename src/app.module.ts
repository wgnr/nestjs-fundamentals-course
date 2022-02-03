import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.environment',
      // ignoreEnvFile: process.env.NODE_ENV === 'production',
      // validationSchema: Joi.object({
      //   DATABASE_HOST: Joi.string().required(),
      //   DATABASE_PORT: Joi.number().default(5432),
      //   DATABASE_USERNAME: Joi.string().required(),
      //   DATABASE_PASSWORD: Joi.string().required(),
      //   DATABASE_DATABASE: Joi.string().required(),
      // }),
      load: [appConfig],
      // isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: 'postgres',
        host: cs.get<string>('DATABASE_HOST'),
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        autoLoadEntities: true,
        synchronize: true, // !! Disable in PROD !!,
      }),
    }),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
