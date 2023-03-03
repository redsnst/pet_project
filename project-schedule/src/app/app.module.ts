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
@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavComponentComponent,
    ScheduleComponent,
    SelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
