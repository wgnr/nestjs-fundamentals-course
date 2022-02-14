import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';

@Module({
  providers: [CoffeesService],
  controllers: [CoffeesController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Coffee.name,
        schema: CoffeeSchema,
      },
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
})
export class CoffeesModule {}
