import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee, CoffeeDocument } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findById(id).exec();

    if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);

    return coffee;
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return coffee.remove();
  }

  async recommendCoffee(coffee: CoffeeDocument) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new this.eventModel({
        name: 'recommend_coffee',
        type: 'coffee',
        payload: { coffeeId: coffee.id },
      });

      await Promise.all([
        recommendEvent.save({ session }),
        coffee.save({ session }),
      ]);

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }
}
