import * as moment from 'moment';

export class DateTimeUtil {
  static format(date: Date, format = 'YYYY-MM-DDTHH:mm:ss'): string {
    return moment(date).format(format);
  }
}
