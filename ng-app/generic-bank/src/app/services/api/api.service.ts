import { Injectable } from '@angular/core';
import {HttpClient,} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {map, take, catchError} from 'rxjs/operators';
import { interval, of} from 'rxjs';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Injectable()
export class ApiService {
  // private baseURL: string;
  private readonly TIME_URL = '/time';

  constructor(private http: HttpClient) {
  }


  getUTCTime(zone: string) {
    return this.httpRequest<timeResponse>(`${this.TIME_URL}?zone=${zone}`, 'GET').pipe(
      map(item => {
        item.date = new Date(item.formatted).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return item;
      })
    );
  }

  getTime(...zones): Observable<any> {
    let ret = new BehaviorSubject(null);
    let requests = [];

    interval(1000).pipe(
      take(zones.length),
      map((n) => {
        console.log(zones[n]);
        return this.getUTCTime(zones[n]);
      })
    ).subscribe((item) => {
      item.subscribe(time => {
        requests.push(time);

        if(requests.length === zones.length) {
          ret.next(requests);
          return ret.complete();
        }
      }, err => {
        ret.error(err);
        return ret.complete();
      });
    });

    // console.log(requests);
    return ret.asObservable();
  }

  private httpRequest<T>(url: string, method: string, options: any = {}): Observable<any> {
    return this.http.request<T>(method, url, options).pipe(
      catchError((err) => {
        // console.log('ERROR HANDLER');
        throw new Error(err)
      })
    );
  }
}

export interface timeResponse {
  countryName: string,
  formatted: string,
  status: string
}
