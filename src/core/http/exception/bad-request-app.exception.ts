import { BaseAppException } from './base-app.exception';
import { HttpStatus } from '@nestjs/common';
import { HttpResponseStatusCodeConst } from '../const/http-response-status-code.const';

export class BadRequestAppException extends BaseAppException {
  constructor(
    message: string,
    statusCode = HttpResponseStatusCodeConst.BAD_REQUEST,
    devMessage = null,
  ) {
    super(message, HttpStatus.BAD_REQUEST, statusCode, devMessage);
  }
}
