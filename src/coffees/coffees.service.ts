import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

const mockCoffee: Coffee = {
  id: 1,
  name: 'Shipwreck Roast',
  brand: 'Buddy Brew',
  flavors: ['chocolate', 'vanilla'],
};

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [mockCoffee];

  create(coffee: CreateCoffeeDto) {
    this.coffees.push({ id: this.coffees.length + 1, ...coffee });
    return this.coffees.slice(-1)[0];
  }

  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    const coffee = this.coffees.find((i) => i.id === +id);

    if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);

    return coffee;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
    }

    return existingCoffee;
  }

  remove(id: number) {
    const coffeeIndex = this.coffees.findIndex((i) => i.id === +id);
    if (coffeeIndex === -1) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    this.coffees.slice(coffeeIndex, 1);
  }
}
