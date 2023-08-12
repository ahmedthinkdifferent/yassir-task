import { HttpException } from '@nestjs/common';
import { HttpResponseStatusCodeConst } from '../const/http-response-status-code.const';
import * as process from 'process';

export class BaseAppException extends HttpException {
  statusCode: HttpResponseStatusCodeConst;
  devMessage?: string;

  constructor(
    message: string,
    status: number,
    statusCode: HttpResponseStatusCodeConst,
    devMessage?: string,
  ) {
    super(message, status);
    this.statusCode = statusCode;
    this.devMessage = devMessage;
  }

  buildResponseBody() {
    return {
      statusCode: this.statusCode,
      data: null,
      message: this.message,
      devMessage: process.env.NODE_ENV == 'prod' ? null : this.devMessage,
    };
  }
}
