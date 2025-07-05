import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,tap } from 'rxjs';
import { BASE_URL } from './config';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_ENDPOINT: string ='/api/auth/';

  constructor(private http: HttpClient) {
    
  }
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      BASE_URL + this.AUTH_ENDPOINT + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }
  
 

  register(username: string, email: string, password: string, phone: string): Observable<any> {
    return new Observable((observer) => {
      this.http.get<any>(`${BASE_URL}/signuptoken`).subscribe(
        data => {
          const token = data.token;
          const roles = 'user';
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-signuptoken': `Bearer ${token}`,
          });
  
          this.http.post(
            `${BASE_URL}/onlyusersignup`,
            {
              username,
              email,
              password,
              phone,
              roles,
            },
            { headers}
          ).subscribe(
            response => {
              // Handle the response
              observer.next(response);
              observer.complete();
            },
            error => {
              // Handle the error
              observer.error(error);
            }
          );
        },
        error => {
          console.error('Error:', error);
          observer.error(error);
        }
      );
    });
  }
  

  registerwithrole(username: string, email: string, password: string,phone: string, roles: string): Observable<any> {
    return new Observable((observer) => {
      const authUserJSON = localStorage.getItem('auth-user');
      const userrole = authUserJSON ? JSON.parse(authUserJSON) : null;
      const currentrole = userrole.roles;      

      this.http.get<any>(`${BASE_URL}/signuptoken`).subscribe(
        data => {
          const token = data.token;
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-signuptoken': `Bearer ${token}`
          });
  
          this.http.post(
            `${BASE_URL}/customroleadduser`,
            {
              username,
              email,
              password,
              phone,
              roles,
              currentrole,
            },
            { headers }
          ).subscribe(
            response => {
              // Handle the response
              observer.next(response);
              observer.complete();
            },
            error => {
              // Handle the error
              observer.error(error);
            }
          );
        },
        error => {
          console.error('Error:', error);
          observer.error(error);
        }
      );
    });
  }

  logout(): Observable<any> {
    return this.http.post(BASE_URL + this.AUTH_ENDPOINT + 'signout', { }, httpOptions);
  }
}

