import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DayScheduleComponent } from '../schedules/day-schedule/day-schedule.component';
import { MonthScheduleComponent } from '../schedules/month-schedule/month-schedule.component';
import { WeekScheduleComponent } from '../schedules/week-schedule/week-schedule.component';

@Component({
  selector: 'app-tab-selector',
  templateUrl: './tab-selector.component.html',
  styleUrls: ['./tab-selector.component.less']
})
export class TabSelectorComponent implements OnInit {

  @ViewChild('monthTab') public monthTab!: MonthScheduleComponent;
  @ViewChild('weekTab') public weekTab!: WeekScheduleComponent;
  @ViewChild('dayTab') public dayTab!: DayScheduleComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onTabSelected(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.monthTab.update();
        break;
      case 1:
        this.weekTab.update();
        break;
      case 2:
        this.dayTab.update();
        break;
      default:
        break;
    }
  }

}
