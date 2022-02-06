import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // ParseIntPipe,
  Patch,
  Post,
  Query,
  SetMetadata,
  UsePipes,
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator.decorator';
import { promisify } from 'util';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { Protocol } from '../common/decorators/protocol.decorator';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
const wait = promisify(setTimeout);

@ApiTags('Coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {
    // console.log('Controller instantieted - Scope Request');
  }

  // @SetMetadata('isPublic', true)
  @Public()
  @Get()
  findAll(
    @Protocol() protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log({ protocol });
    return this.coffeeService.findAll(paginationQuery);
  }

  @Public()
  @Get(':id')
  // ParseIntPipe will thrown an error when can't convert it correctly
  // findOne(@Param('id', ParseIntPipe) id: number) {
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(`CoffeesController ${id}`);
    // return wait(4000).then((_) => this.coffeeService.findOne(id));
    return this.coffeeService.findOne(+id);
  }

  @Public()
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.coffeeService.remove(id);
  }
}
