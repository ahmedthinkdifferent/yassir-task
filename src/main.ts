import { DbConnectionService } from './core/data/db/service/db-connection.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CityAirQualityCronService } from './core/job/city-air-quality-cron.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dbConnectionService = app.get(DbConnectionService);
  await dbConnectionService.connect().catch((e) => {
    console.log(e);
  });
  const cronJob = app.get(CityAirQualityCronService);
  cronJob.cityAirQualityCron().catch((e) => {
    console.log(e);
  });
  await app.listen(3000);
}

bootstrap();
