import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  timeFrom: string;
  timeTo: string;
}

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.less']
})
export class EventModalComponent {

  public constructor(
    public dialogRef: MatDialogRef<EventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
