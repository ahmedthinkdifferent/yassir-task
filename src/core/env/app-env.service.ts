import { Injectable } from '@nestjs/common';
import { AppEnv } from './app-env';

@Injectable()
export class AppEnvService {
  getAppEnv(): AppEnv {
    return {
      aqApiKey: process.env.AQ_API_KEY,
      dbHost: process.env.DB_HOST,
      dbPort: parseInt(process.env.DB_PORT),
      dbUser: process.env.DB_USER,
      dbPassword: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
    };
  }

  getAQApiKey(): string {
    return this.getAppEnv().aqApiKey;
  }

  getDbConfig() {
    return {
      host: this.getAppEnv().dbHost,
      port: this.getAppEnv().dbPort,
      user: this.getAppEnv().dbUser,
      password: this.getAppEnv().dbPassword,
      dbName: this.getAppEnv().dbName,
    };
  }
}
