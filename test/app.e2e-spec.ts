import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AirQualityController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/air-quality (GET) should success', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/air-quality?latitude=48.856613&longitude=2.352222')
      .expect(200);

    expect(response.body).toEqual({
      data: {
        Result: {
          Pollution: {
            ts: expect.any(String),
            aqius: expect.any(Number),
            mainus: expect.any(String),
            aqicn: expect.any(Number),
            maincn: expect.any(String),
          },
        },
      },
      statusCode: 'SUCCESS',
      message: '',
    });
  });

  it('/api/v1/air-quality (GET) should fail for because of invalid params', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/air-quality?latitude=x&longitude=x')
      .expect(412);

    expect(response.body).toEqual({
      data: null,
      statusCode: 'VALIDATION_FAILED',
      message: '"latitude" must be a number',
    });
  });
});
