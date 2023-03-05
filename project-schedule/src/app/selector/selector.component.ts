import { Component, Input, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MomentPipe } from '../shared/moment.pipe';
import * as moment from 'moment';

@UntilDestroy()
@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.less']
})
export class SelectorComponent implements OnInit {

  @Input() public type: moment.unitOfTime.DurationConstructor = 'month';

  public newDate!: string;
  public momentDate!: moment.Moment;

  constructor(private readonly dateService: DateService, private momentPipe: MomentPipe) { }

  ngOnInit(): void {
    this.dateService.date.pipe(untilDestroyed(this)).subscribe(currentDate => {
      this.momentDate = currentDate.clone();
      this.newDate = this.momentPipe.transform(currentDate, this.type);
    });
  }

  public nextDate(): void {
    this.dateService.nextDate(this.type);
  }

  public previousDate(): void {
    this.dateService.previousDate(this.type);
  }
}
