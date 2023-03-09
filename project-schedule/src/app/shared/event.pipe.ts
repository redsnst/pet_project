import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'event'
})
export class EventPipe implements PipeTransform {

  transform(value: string, format: string = 'HH:mm'): string {
    return moment(value).format(format);
  }

}
