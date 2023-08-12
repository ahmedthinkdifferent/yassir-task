import { ValidationAppException } from '../http/exception/validation-app.exception';
import { Schema } from 'joi';

export class ValidatorUtil {
  static validate(data: unknown, schema: Schema) {
    const result = schema.validate(data, { convert: true });
    if (result.error) {
      throw new ValidationAppException(result.error.message);
    }
    return result;
  }
}
