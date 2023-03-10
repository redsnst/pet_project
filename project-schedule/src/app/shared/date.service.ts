import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date = new BehaviorSubject<moment.Moment>(moment());

  public nextDate(type: moment.unitOfTime.DurationConstructor): void {
    this.date.next(this.date.value.add(1, type))
  }

  public previousDate(type: moment.unitOfTime.DurationConstructor): void {
    this.date.next(this.date.value.add(-1, type))
  }

  public dateTrigger() : void {
    this.date.next(moment());
  }
}
