import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseAppException } from '../base-app.exception';
import { HttpResponseStatusCodeConst } from '../../const/http-response-status-code.const';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof BaseAppException) {
      return response
        .status(exception.getStatus())
        .json(exception.buildResponseBody());
    }

    // we can log exception here and send it to loki & grafana or datadog.
    return response.status(500).json({
      statusCode: HttpResponseStatusCodeConst.SERVER_ERROR,
      data: null,
      message: 'server error',
      devMessage: process.env.NODE_ENV == 'prod' ? null : exception.stack,
    });
  }
}
