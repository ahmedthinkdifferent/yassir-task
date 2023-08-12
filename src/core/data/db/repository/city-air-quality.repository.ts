import { Injectable } from '@nestjs/common';
import { DbConnectionService } from '../service/db-connection.service';
import { CityAirQualityModel } from '../model/city-air-quality.model';

@Injectable()
export class CityAirQualityRepository {
  constructor(private readonly dbConnectionService: DbConnectionService) {}

  async save(cityAirQuality: {
    ts: string;
    aqius: number;
    mainus: string;
    aqicn: number;
    maincn: string;
  }) {
    return this.dbConnectionService
      .getConnection()
      .insert(cityAirQuality)
      .into('cities_air_quality');
  }

  async findMaxPopulatedTime() {
    const rows = await this.dbConnectionService.getConnection()
      .raw(`select ciq.*
from cities_air_quality ciq
where ciq.aqius = (select max(t1.aqius) from cities_air_quality t1) limit 1`);
    if (rows[0].length > 0) {
      return rows[0][0] as CityAirQualityModel;
    }
    return null;
  }
}
