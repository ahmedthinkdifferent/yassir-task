require('dotenv').config();
import { Module } from '@nestjs/common';
import { ApiService } from './core/http/service/api.service';
import { AirQualityService } from './domain/air-quality/v1/service/air-quality.service';
import { AirQualityController } from './domain/air-quality/v1/controller/air-quality.controller';
import { AppEnvService } from './core/env/app-env.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './core/http/exception/expcetion-filter/http-exception.filter';
import { ScheduleModule } from '@nestjs/schedule';
import { CityAirQualityRepository } from './core/data/db/repository/city-air-quality.repository';
import { DbConnectionService } from './core/data/db/service/db-connection.service';
import { CityAirQualityCronService } from './core/job/city-air-quality-cron.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AirQualityController],
  providers: [
    ApiService,
    AppEnvService,
    AirQualityService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    DbConnectionService,
    CityAirQualityRepository,
    CityAirQualityCronService,
  ],
})
export class AppModule {}
