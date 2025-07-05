import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timestamp } from 'rxjs';
import { BASE_URL } from './config';
import { data } from 'jquery';
import { StorageService } from './storage.service';
import { BarElement } from 'chart.js';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  USER_ENDPOINT: string ='/api/test/';

  constructor(private http: HttpClient, private storageService: StorageService) {}

  getRouteListContent(): Observable<any> {
    return this.http.get(BASE_URL + this.USER_ENDPOINT + 'route', { responseType: 'text' });
  }

  getPublicContent(): Observable<any> {
    return this.http.get(BASE_URL + this.USER_ENDPOINT + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`
    });
    return this.http.get(BASE_URL + this.USER_ENDPOINT + 'user', { headers,responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`
    });
    return this.http.get(BASE_URL + this.USER_ENDPOINT + 'mod', { headers,responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`
    });
    return this.http.get(BASE_URL + this.USER_ENDPOINT + 'admin', { headers, responseType: 'text' });
  }


    // Generic function to make an HTTP GET request
    get<T>(endpoint: string): Observable<T> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
      return this.http.get<T>(`${BASE_URL}/${endpoint}`, { headers });
    }
  
    // Generic function to make an HTTP POST request
    post<T>(endpoint: string, data: any): Observable<T> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
      return this.http.post<T>(`${BASE_URL}/${endpoint}`, data, { headers });
    }
  
    // Generic function to make an HTTP PUT request
    put<T>(endpoint: string, data: any): Observable<T> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
      return this.http.put<T>(`${BASE_URL}/${endpoint}`, data, { headers });
    }
  
    // Generic function to make an HTTP DELETE request
    delete<T>(endpoint: string): Observable<T> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
      return this.http.delete<T>(`${BASE_URL}/${endpoint}`, { headers });
    }
  
    getRequest<T>(url: string): Observable<T> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
      return this.http.get<T>(`${BASE_URL}${url}`, { headers });
    }

    getCountsUser(): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
  
      return this.http.get<any>(`${BASE_URL}/dashboardUser/counts`, { headers });
    }

    getCountsBus(): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
  
      return this.http.get<any>(`${BASE_URL}/dashboardBus/counts`, { headers });
    }

    getCountsRoute(): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
  
      return this.http.get<any>(`${BASE_URL}/dashboardRoutes/counts`, { headers });
    }

    getCountsStation(): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
  
      return this.http.get<any>(`${BASE_URL}/dashboardStations/counts`, { headers });
    }

    deleteUser(userId: number): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
  
      return this.http.delete<any>(`${BASE_URL}/deleteusers/${userId}`, { headers });
    }

    getStation(): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
  
      return this.http.get<any>(`${BASE_URL}/stationlist`, { headers });
    }

    gettotalRoutes(): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
  
      return this.http.get<any>(`${BASE_URL}/routelist`, { headers });
    }

    getTicketDetails(qrCodeData: string): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
    
      const [ticketId, ticketTimestamp, totalSeats] = qrCodeData.replace(',', '').split(' ');
    
      const requestBody = {
        ticket: {
          ticketId: ticketId,
          ticketTimestamp: ticketTimestamp,
          totalSeats: totalSeats
        }
      };
    
      return this.http.post<any>(`${BASE_URL}/verifyticket`, requestBody, { headers: headers });
    }

    changePassword(data : any): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      });
  
      return this.http.post<any>(`${BASE_URL}/changepassword`, data, { headers });
    }

  
    getTicket(ticketId: string): Observable<any> {
      const url = `${BASE_URL}/get-ticket/${ticketId}`;
      return this.http.get(url);
    }
  
    getComments(ticketId: string): Observable<any[]> {
      const url = `${BASE_URL}/get-comments/${ticketId}`;
      return this.http.get<any[]>(url);
    }
  
    addComment(ticketId: string, commentText: string): Observable<any> {
      const payload = {
        ticketId,
        commentText
      };
      return this.http.post(`${BASE_URL}/add-comment`, payload); // Use correct URL for the API endpoint
    }


    getHelpTickets(): Observable<any[]> {
      return this.http.get<any[]>(`${BASE_URL}/helpticketlist`);
    }

    getBusLocation(busName: string): Observable<any> {
      const url = `${BASE_URL}/bus-location/${busName}`;
      return this.http.get(url);
    }

    getBusLocations(): Observable<any> {
      return this.http.get<any[]>(`${BASE_URL}/bus-locations`);
    }
  
    getStationStatus(currentBusName: string, routeName: string): Observable<any> {
      // Include the currentBusName in the URL as a query parameter
      const url = `${BASE_URL}/get-station-status?busName=${currentBusName}&routeName=${routeName}`;
      return this.http.get(url);
    }

    getRouteStations(routeName: string): Observable<any[]> {
      const url = `${BASE_URL}/getRouteStations?routeName=${routeName}`;
      return this.http.get<any[]>(url);
    }
  
    getRouteByBusName(busName: string): Observable<string> {
      const url = `${BASE_URL}/getRouteByBusName?busName=${busName}`;
      return this.http.get<string>(url);
    }
  }
