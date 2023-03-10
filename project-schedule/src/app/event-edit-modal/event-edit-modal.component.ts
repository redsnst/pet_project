import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../shared/task.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';

interface removeData {
  id: string;
  day: any;
  event: any;
  timeFrom: string;
  timeTo: string;
}

@UntilDestroy()
@Component({
  selector: 'app-event-edit-modal',
  templateUrl: './event-edit-modal.component.html',
  styleUrls: ['./event-edit-modal.component.less']
})
export class EventEditModalComponent implements OnInit {

  public constructor(
    public dialogRef: MatDialogRef<EventEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: removeData,
    private readonly taskService: TaskService
  ) {}

  public ngOnInit(): void {
    this.data.timeFrom = moment(this.data.event.timeFrom).format('HH:mm')
    this.data.timeTo= moment(this.data.event.timeTo).format('HH:mm')
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public deleteEvent(): void {
    this.taskService.delete({id: this.data.id, date: this.data.day.value.format('MM-YYYY') }).pipe(untilDestroyed(this)).subscribe();
    this.dialogRef.close();
  }

  public editEvent(): void {
    const newEvent = {...this.data.event, timeFrom: `${this.data.day.value.format('YYYY-MM-DD')} ${this.data.timeFrom}:00`, timeTo: `${this.data.day.value.format('YYYY-MM-DD')} ${this.data.timeTo}:00`}
    this.taskService.update({id: this.data.id, date: this.data.day.value.format('MM-YYYY'), event: newEvent}).pipe(untilDestroyed(this)).subscribe();
    this.dialogRef.close();
  }
}
