import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  getUserTickets(userId: string): Observable<any> {
    return this.http.get(`${BASE_URL}/users/${userId}/tickets`);
  }
}