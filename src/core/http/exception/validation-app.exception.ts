import { BaseAppException } from './base-app.exception';
import { HttpStatus } from '@nestjs/common';
import { HttpResponseStatusCodeConst } from '../const/http-response-status-code.const';

export class ValidationAppException extends BaseAppException {
  constructor(message: string, devMessage?: string) {
    super(
      message,
      HttpStatus.PRECONDITION_FAILED,
      HttpResponseStatusCodeConst.VALIDATION_FAILED,
      devMessage,
    );
  }
}
