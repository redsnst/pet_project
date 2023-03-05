import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/shared/date.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EventModalComponent,  } from 'src/app/event-modal/event-modal.component';

interface Day {
  value: moment.Moment,
  active: boolean,
  disabled: boolean,
  selected: boolean,
  event: any[]
}

interface Week {
  days: Day[];
}

@UntilDestroy()
@Component({
  selector: 'app-month-schedule',
  templateUrl: './month-schedule.component.html',
  styleUrls: ['./month-schedule.component.less'],
  providers: [DateService]
})
export class MonthScheduleComponent implements OnInit {

  public calendar: Week[] = []
  public name!: string;
  public description!: string;
  public timeFrom!: string;
  public timeTo!: string;

  public constructor(private readonly dateService: DateService, public dialog: MatDialog) { }

  public openDialog(day: Day): void {
    const dialogRef = this.dialog.open(EventModalComponent, {
      data: {name: this.name, description: this.description, timeFrom: this.timeFrom, timeTo: this.timeTo},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name && result.timeFrom && result.timeTo) {
        day.event.push(result);
        console.log(day);
      }
    });
  }


  public ngOnInit(): void {
    this.dateService.date.pipe(untilDestroyed(this)).subscribe(this.generateCalendare.bind(this));
  }

  public generateCalendare(now: moment.Moment): void {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');
    
    const date = startDay.clone().subtract(1, 'day');

    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');
            const event: [] = [];

            return {
              value, active, disabled, selected, event
            }
          })
      })
    }
    
    this.calendar = calendar; 
  }
}
