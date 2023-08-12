import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AirQualityService } from '../service/air-quality.service';
import { HttpResponseStatusCodeConst } from '../../../../core/http/const/http-response-status-code.const';

@Controller('/api/v1/air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get('')
  async nearestCityAirQuality(@Req() request: Request) {
    const cityAirQuality =
      await this.airQualityService.getNearestCityAirQuality(
        request.query as unknown as { latitude: number; longitude: number },
      );
    return {
      data: cityAirQuality,
      statusCode: HttpResponseStatusCodeConst.SUCCESS,
      message: '',
    };
  }

  @Get('/paris-most-populated-time')
  async parisMostPopulatedTime() {
    return {
      data: await this.airQualityService.parisMostPopulatedTime(),
      statusCode: HttpResponseStatusCodeConst.SUCCESS,
      message: '',
    };
  }
}
