import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const MONTH = 'month';
const WEEK = 'week';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  public transform(value: moment.Moment | null, formats: string = 'month'): string {
    if (formats === WEEK) {
      const startOfWeek = value!.clone().startOf('week').format('DD MMMM YYYY');
      const endOfWeek = value!.clone().endOf('week').format('DD MMMM YYYY');
      return `${startOfWeek} - ${endOfWeek}`;
    } else if (formats === MONTH){
      return value!.format('MMMM YYYY');
    } else {
      return value!.format('DD MMMM YYYY');
    }   
  }
}
