import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'daySchedule'
})
export class DaySchedulePipe implements PipeTransform {

  public transform(value: {startHour: string, endHour: string}, format: string = 'HH:mm'): string {
    return `${moment(value.startHour).format(format)}-${moment(value.endHour).format(format)}`;
  }

}
