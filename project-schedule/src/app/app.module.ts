import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { MaterialModule } from './modules/material/material.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { SelectorComponent } from './selector/selector.component';
import { DayScheduleComponent } from './schedules/day-schedule/day-schedule.component';
import { WeekScheduleComponent } from './schedules/week-schedule/week-schedule.component';
import { MonthScheduleComponent } from './schedules/month-schedule/month-schedule.component';
import { TabSelectorComponent } from './tab-selector/tab-selector.component';
import { MomentPipe } from './shared/moment.pipe';
import { DayMomentPipe } from './shared/day-moment.pipe';
import { EventModalComponent } from './event-modal/event-modal.component';
import { DaySchedulePipe } from './shared/day-schedule.pipe';
import { EventPipe } from './shared/event.pipe';
import { EventEditModalComponent } from './event-edit-modal/event-edit-modal.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component'
@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavComponentComponent,
    ScheduleComponent,
    SelectorComponent,
    TabSelectorComponent,
    MonthScheduleComponent,
    WeekScheduleComponent,
    DayScheduleComponent,
    DayMomentPipe,
    EventModalComponent,
    DaySchedulePipe,
    EventPipe,
    EventEditModalComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [MomentPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
