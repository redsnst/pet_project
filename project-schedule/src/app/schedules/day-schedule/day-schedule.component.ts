import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/shared/date.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';

@UntilDestroy()
@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.less'],
  providers: [DateService]
})
export class DayScheduleComponent implements OnInit {

  public times: string[] = [];

  public constructor(private readonly dateService: DateService) { }

  public ngOnInit(): void {
    this.dateService.date.pipe(untilDestroyed(this)).subscribe(this.generateCalendare.bind(this));
  }

  public generateCalendare() {
    var start = moment().startOf('day');
    var times = [];

    for (var i = 0; i < 24; i++) {
      var hour = start.format('h');
      var ampm = start.format('A'); 
      var interval = hour + ':00-' + (Number(hour) == 12 ? 1 : parseInt(hour) + 1) + ':00' + ampm;
      times.push(interval); 
      start.add(1, 'hour'); 
    }

    this.times = times;
  }
}
