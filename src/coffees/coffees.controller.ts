import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ValidateMongoIdPipe } from '../common/pipes/ValidateMongoId.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  // ParseIntPipe will thrown an error when can't convert it correctly
  // findOne(@Param('id', ParseIntPipe) id: number) {
  findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.coffeeService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    console.log(updateCoffeeDto);
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    this.coffeeService.remove(id);
  }
}
