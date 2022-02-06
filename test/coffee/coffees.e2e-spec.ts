import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfigs } from '../../src/main.config';
import { CreateCoffeeDto } from '../../src/coffees/dto/create-coffee.dto';

describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication;
  const coffee: CreateCoffeeDto = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Insert the logic in the main.ts
    appConfigs(app);

    await app.init();
  });

  it('Create [POST /]', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/coffees')
      .set('Accept', 'application/json')
      .send(coffee)
      .expect('Content-Type', /application\/json/)
      .expect(HttpStatus.CREATED);

    const expectedCoffee = expect.objectContaining({
      ...coffee,
      flavors: expect.arrayContaining(
        coffee.flavors.map((name) => expect.objectContaining({ name })),
      ),
    });

    expect(body?.data).toEqual(expectedCoffee);
  });
  it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
