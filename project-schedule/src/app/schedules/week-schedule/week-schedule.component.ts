import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/shared/date.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';

interface Day {
  value: moment.Moment,
  active: boolean,
  selected: boolean
}
interface Days {
  days: Day[]
}

@UntilDestroy()
@Component({
  selector: 'app-week-schedule',
  templateUrl: './week-schedule.component.html',
  styleUrls: ['./week-schedule.component.less'],
  providers: [DateService]
})
export class WeekScheduleComponent implements OnInit {

  public calendar: Days = {
    days: []
  }

  public constructor(private readonly dateService: DateService) { }

  public ngOnInit(): void {
    this.dateService.date.pipe(untilDestroyed(this)).subscribe(this.generateCalendare.bind(this));
  }

  public generateCalendare(now: moment.Moment): void {
    const startDay = now.clone().startOf('week');
    
    const date = startDay.clone().subtract(1, 'day');

    let calendar = {
      days: Array(7)
        .fill(0)
        .map(() => {
          const value = date.add(1, 'day').clone();
          const active = moment().isSame(value, 'date');
          const selected = now.isSame(value, 'date');

          return {
            value, active, selected
          }
        })
    }
   this.calendar = calendar;
   
  }

}
