import { AirQualityController } from './air-quality.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityService } from '../service/air-quality.service';
import { ApiService } from '../../../../core/http/service/api.service';
import { ValidationAppException } from '../../../../core/http/exception/validation-app.exception';
import { AppEnvService } from '../../../../core/env/app-env.service';
import { CityAirQualityRepository } from '../../../../core/data/db/repository/city-air-quality.repository';

describe('AppController', () => {
  let airQualityService: AirQualityService;
  const getMock = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AirQualityController],
      providers: [
        {
          provide: ApiService,
          useValue: {
            get: getMock,
          },
        },
        AirQualityService,
        {
          provide: AppEnvService,
          useValue: {
            getAppEnv: () => {
              return {
                aqApiKey: 'xxxxxx',
                dbHost: '127.0.0.1',
                dbPort: 3306,
                dbUser: 'root',
                dbPassword: 'ahmed1',
                dbName: 'yassir',
              };
            },
            getAQApiKey: () => {
              return 'xxxxxx';
            },
          },
        },
        {
          provide: CityAirQualityRepository,
          useValue: {
            save: jest.fn(),
            findMaxPopulatedTime: jest.fn(),
          },
        },
      ],
    }).compile();

    airQualityService = app.get<AirQualityService>(AirQualityService);
  });

  describe('AirQualityService', () => {
    it('should throw validation exception because of pass invalid lat & lng values', async () => {
      await expect(
        airQualityService.getNearestCityAirQuality({
          latitude: -1,
          longitude: -1,
        }),
      ).rejects.toThrow(ValidationAppException);
    });

    it('should return Result with Pollution', async () => {
      // Arrange
      const pollution = {
        Result: {
          Pollution: {
            aqius: 27,
            mainus: 'p2',
            aqicn: 14,
            maincn: 'n2',
            ts: '2023-08-11T23:00:00.000Z',
          },
        },
      };
      getMock.mockResolvedValue({
        data: {
          current: {
            pollution: pollution,
          },
        },
      });

      // Act
      const result = await airQualityService.getNearestCityAirQuality({
        latitude: 48.856613,
        longitude: 2.352222,
      });

      // Assert
      expect(result.Result.Pollution).toEqual(pollution);
    });
  });
});
