import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { DateService } from 'src/app/shared/date.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { fireTask, TaskService } from 'src/app/shared/task.service';
import { switchMap } from 'rxjs/operators';

interface dayTimes {
  startHour: string,
  endHour: string
}

@UntilDestroy()
@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.less'],
  providers: [DateService]
})
export class DayScheduleComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('redLine') public redLine!: ElementRef<HTMLDivElement>;

  public times: dayTimes[] = [];
  public date!: moment.Moment;
  public events: fireTask[] = [];
  public redLineInterval: any;

  public constructor(private readonly dateService: DateService, private readonly taskService: TaskService) { }

  public ngOnInit(): void {
    this.dateService.date.pipe(untilDestroyed(this)).subscribe(date => {
      this.generateCalendare(date);
      this.date = date.clone();
      if (this.redLine) {
        this.redLineCalculate();
      }
    });
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value)),
      untilDestroyed(this)
    ).subscribe(tasks => {
      this.events = [];
      tasks.forEach(task => {
          const tableDay = moment(this.date).format('YYYY-MM-DD');
          const taskDay = moment(task.timeFrom).format('YYYY-MM-DD');
          if (tableDay === taskDay) {
            const eventStart = moment(task.timeFrom);
            const eventEnd = moment(task.timeTo);
            const tableStart = moment(this.date.clone().startOf('day'), 'HH:mm');
            const timeDiff = eventStart.diff(tableStart, 'minutes');
            const rowHeight = 1248 / 24;
            const eventTop = (timeDiff / 60) * rowHeight;
            const blockHeight = (eventEnd.diff(eventStart, 'minutes') / 60) * rowHeight;
            
            const index = this.events.findIndex(event => {
              return event.timeFrom === task.timeFrom
            });

            if (index === -1) {
              this.events.push({...task, top: `${eventTop}px`, height: `${blockHeight}px`});
            }
          }
      })     
    })
  }

  public ngAfterViewInit(): void {
    this.redLineCalculate();
    this.redLineInterval = setInterval(() => {
      this.redLineCalculate();
    }, 1 * 60 * 1000)
  }

  public ngOnDestroy(): void {
    clearInterval(this.redLineInterval);
  }

  public redLineCalculate() {
    const nowTime = moment();
    if (this.date.format('DD-MM-YYYY') === nowTime.format('DD-MM-YYYY')) {
      const tableStart = moment(this.date.clone().startOf('day'), 'HH:mm');
      const rowHeight = 1248 / 24;
      const timeDiff = nowTime.diff(tableStart, 'minutes');
      const eventTop = (timeDiff / 60) * rowHeight;
      this.redLine.nativeElement.style.visibility = 'visible'
      this.redLine.nativeElement.style.top = eventTop + 'px'
    } else {
      this.redLine.nativeElement.style.visibility = 'hidden'
    }
    
  }

  public generateCalendare(date: moment.Moment) {
    var start = date.clone().startOf('day');
    var times = [];

    for (var i = 0; i < 24; i++) {
      const startHour = start.clone();
      const endHour = start.clone().add(1, 'hour');
      times.push({startHour: startHour.format('YYYY-MM-DD HH:mm:ss'), endHour: endHour.format('YYYY-MM-DD HH:mm:ss')});
      start.add(1, 'hour'); 
    }

    this.times = times;
  }

  public update(): void {
    this.dateService.dateTrigger();
  }
}
