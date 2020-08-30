import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {filter, map, mergeMap, pluck, share, switchMap, tap, toArray, catchError, retry} from 'rxjs/operators'
import {HttpClient, HttpParams} from "@angular/common/http";
import {NotificationsService} from "../notifications/notifications.service";

interface OpenWeatherResponse {
  list: {
    main: {
      temp: number;
    }
    dt_txt: string;
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient, private notificationsService: NotificationsService) { }

  getCurrentLocation() {
    return new Observable<Coordinates>( (observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      )
    }).pipe(
      retry(1),
      tap( () => {
        this.notificationsService.addSuccess('Got your location');
      }),
      catchError((err) => {
        this.notificationsService.addError('Failed to get location');
        return throwError(err);
      })
    )
  }

  getForecast() {
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units','metric')
            .set('appid','af5de96cf543b1da76d50c16c723c43e')
        }),
        switchMap(params => this.http.get<OpenWeatherResponse>(this.url, {params})),
        pluck('list'),
        mergeMap(value => of(...value)),
        filter( (value, index ) => index % 8 === 0 ),
        map(value=> {
          return {dateString: value.dt_txt, temp: value.main.temp}
        }),
        toArray(),
        share()
      )
  }
}
