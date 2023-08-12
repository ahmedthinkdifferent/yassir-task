import { Knex } from 'knex';
import { AppEnvService } from '../../../env/app-env.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbConnectionService {
  private knex: Knex;

  constructor(private readonly appEnvService: AppEnvService) {}

  async connect() {
    this._initDB();
  }

  private _initDB() {
    const dbConfig = this.appEnvService.getDbConfig();

    this.knex = require('knex')({
      client: 'mysql2',
      connection: {
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.dbName,
      },
    });
    console.log('connected to db');
  }

  getConnection() {
    return this.knex;
  }
}
