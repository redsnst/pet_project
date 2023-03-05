import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dayMoment'
})
export class DayMomentPipe implements PipeTransform {

  transform(value: moment.Moment, format: string = 'ddd DD'): string {
    return value.format(format);
  }

}
