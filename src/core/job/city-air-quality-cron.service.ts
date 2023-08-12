import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AirQualityService } from '../../domain/air-quality/v1/service/air-quality.service';
import { CityAirQualityRepository } from '../data/db/repository/city-air-quality.repository';
import { DateTimeUtil } from '../util/date-time.util';

@Injectable()
export class CityAirQualityCronService {
  constructor(
    private readonly airQualityService: AirQualityService,
    private readonly cityAirQualityRepository: CityAirQualityRepository,
  ) {}

  @Cron('*/5 * * * *')
  async cityAirQualityCron() {
    try {
      console.log(`cron job started at ${new Date().toISOString()}`);
      const cityAirQuality =
        await this.airQualityService.getNearestCityAirQuality({
          latitude: 48.856613,
          longitude: 2.352222,
        });

      const pollution = cityAirQuality.Result.Pollution;
      await this.cityAirQualityRepository.save({
        ...pollution,
        ts: DateTimeUtil.format(pollution.ts),
      });
      console.log(`cron job end at ${new Date().toISOString()}`);
    } catch (e) {
      console.log(e);
      console.log(
        `cron job end at ${new Date().toISOString()} with error ${e.message}`,
      );
    }
  }
}
