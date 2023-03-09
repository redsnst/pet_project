import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/shared/date.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { EventModalComponent,  } from 'src/app/event-modal/event-modal.component';
import { TaskService, fireTask } from 'src/app/shared/task.service';
import { switchMap } from 'rxjs/operators';

interface Day {
  value: moment.Moment,
  active: boolean,
  selected: boolean,
  event: fireTask[],
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

  public name!: string;
  public timeFrom!: string;
  public timeTo!: string;


  public constructor(private readonly dateService: DateService, public dialog: MatDialog, private readonly taskService: TaskService) { }

  public openDialog(day: Day): void {
    const dialogRef = this.dialog.open(EventModalComponent, {
      data: {name: this.name, timeFrom: this.timeFrom, timeTo: this.timeTo},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name && result.timeFrom && result.timeTo) {
        const task = {
          name: result.name,
          timeFrom: `${day.value.format('YYYY-MM-DD')} ${result.timeFrom}:00`,
          timeTo: `${day.value.format('YYYY-MM-DD')} ${result.timeTo}:00`,
          currentDate: day.value.format('DD-MM-YYYY'),
          date: day.value.format('MM-YYYY')
        }
        day.event.push(task);
        this.taskService.create(task).pipe(untilDestroyed(this)).subscribe();
      }
    });
  }

  public ngOnInit(): void {
    this.dateService.date.pipe(untilDestroyed(this)).subscribe(this.generateCalendare.bind(this));
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value)),
      untilDestroyed(this)
    ).subscribe(tasks => {
      this.calendar.days.forEach((day: Day) => {
        day.event = tasks.filter(task => task.currentDate === day.value.format('DD-MM-YYYY')).map(task => task);
      }) 
    })
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
          const event: fireTask[] = [];
          return {
            value, active, selected, event
          }
        })
    }
   this.calendar = calendar;
   
  }

}
