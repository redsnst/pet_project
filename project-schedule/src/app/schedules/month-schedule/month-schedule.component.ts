import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/shared/date.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { EventModalComponent,  } from 'src/app/event-modal/event-modal.component';
import { TaskService, fireTask } from 'src/app/shared/task.service';
import { switchMap } from 'rxjs/operators';
import { EventEditModalComponent } from 'src/app/event-edit-modal/event-edit-modal.component';

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

  public openEditDialog(event: any, day: Day): void {
    const dialogRef = this.dialog.open(EventEditModalComponent, {
      data: {id: event.id, day: day, event: event},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dateService.dateTrigger()
    });
  }


  public ngOnInit(): void {
    this.dateService.date.pipe(untilDestroyed(this)).subscribe(date => {
      this.generateCalendare(date);
    });

    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value)),
      untilDestroyed(this)
    ).subscribe(tasks => {
      this.calendar.forEach((week: Week) => {
        week.days.forEach(day => {
          day.event = tasks.filter(task => task.currentDate === day.value.format('DD-MM-YYYY')).map(task => task);
        })
      }) 
    })
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
            let event: fireTask[] = [];
            return {
              value, active, disabled, selected, event
            }
          })
      })
    }
    
    this.calendar = calendar; 
  }

  public update(): void {
    this.dateService.dateTrigger();
  }
}
