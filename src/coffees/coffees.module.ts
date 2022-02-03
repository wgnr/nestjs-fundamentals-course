import { Connection } from 'typeorm';
import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import coffeesConfig from './config/coffees.config';
// import {
//   ConfigService,
//   DevelopmentConfigService,
//   ProductionConfigService,
// } from '../ConfigService/ConfigService';

// class MockCoffeesService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    // stuff
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  exports: [CoffeesService],
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  // providers: [CoffeesService],
  // providers: [{ provide: CoffeesService, useValue: new MockCoffeesService() }],
  providers: [
    CoffeesService,
    // { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
    CoffeeBrandsFactory,
    // {
    //   provide: COFFEE_BRANDS,
    //   // Injected classes
    //   useFactory: (bradsFactory: CoffeeBrandsFactory) => bradsFactory.create(),
    //   inject: [CoffeeBrandsFactory],
    // },
    {
      provide: COFFEE_BRANDS,
      // Async waits until it returns a value
      useFactory: async (
        bradsFactory: CoffeeBrandsFactory,
        connection: Connection,
      ): Promise<string[]> => {
        const coffeeBrands = await connection.query('select name from flavor;');
        // const coffeeBrands = await Promise.resolve(bradsFactory.create());
        return coffeeBrands;
      },
      inject: [CoffeeBrandsFactory, Connection],
      // scope: Scope.DEFAULT
    },
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'production'
    //       ? ProductionConfigService
    //       : DevelopmentConfigService,
    // },
  ],
  controllers: [CoffeesController],
})
export class CoffeesModule {}
