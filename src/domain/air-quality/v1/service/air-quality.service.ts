import { Injectable } from '@nestjs/common';
import { ValidatorUtil } from '../../../../core/util/validator.util';
import { nearbyCityAirQualitySchema } from '../schema/request.schema';
import { ApiService } from '../../../../core/http/service/api.service';
import { AppEnvService } from '../../../../core/env/app-env.service';
import {
  NearbyCityAirQualityDto,
  Pollution,
} from '../dto/nearby-city-air-quality.dto';
import { CityAirQualityRepository } from '../../../../core/data/db/repository/city-air-quality.repository';

@Injectable()
export class AirQualityService {
  constructor(
    private readonly apiService: ApiService,
    private readonly appEnvService: AppEnvService,
    private readonly cityAirQualityRepository: CityAirQualityRepository,
  ) {}

  async getNearestCityAirQuality(location: {
    latitude: number;
    longitude: number;
  }): Promise<{ Result: { Pollution: Pollution } }> {
    // 1 validate query params
    ValidatorUtil.validate(location, nearbyCityAirQualitySchema);

    //2 call api
    const cityAirQualityDto =
      await this.apiService.get<NearbyCityAirQualityDto>({
        url: 'http://api.airvisual.com/v2/nearest_city',
        queryParams: {
          lat: location.latitude,
          lon: location.longitude,
          key: this.appEnvService.getAQApiKey(),
        },
      });

    return {
      Result: {
        Pollution: cityAirQualityDto.data.current.pollution,
      },
    };
  }

  async parisMostPopulatedTime() {
    return this.cityAirQualityRepository.findMaxPopulatedTime();
  }
}
