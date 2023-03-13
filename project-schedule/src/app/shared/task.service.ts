import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface fireTask {
  name: string,
  timeFrom: string,
  timeTo: string,
  date: string,
  currentDate: string,
  top?: string;
  height?: string;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  static url = 'https://my-pet-project-54af1-default-rtdb.europe-west1.firebasedatabase.app/'

  public constructor(private http: HttpClient, private authService: AuthService) { }

  public load(date: moment.Moment): Observable<fireTask[]> {
    return this.http
      .get<fireTask[]>(`${TaskService.url}/${this.authService.userId}/${date.format('MM-YYYY')}.json`)
      .pipe(map((tasks: any) => {
        if (!tasks) {
          return [];
        }
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}));
      }))
  }

  public create(task: fireTask): Observable<any> {
    return this.http
      .post<any>(`${TaskService.url}/${this.authService.userId}/${task.date}.json`, task)
      .pipe(map(res => {
        console.log(res);

        return res;
      }));
  }

  public delete(task: any): Observable<void> {
    return this.http
      .delete<void>(`${TaskService.url}/${this.authService.userId}/${task.date}/${task.id}.json`)
  }

  public update(task: any): Observable<void> {
    return this.http
      .put<void>(`${TaskService.url}/${this.authService.userId}/${task.date}/${task.id}.json`, task.event)
  }
}
