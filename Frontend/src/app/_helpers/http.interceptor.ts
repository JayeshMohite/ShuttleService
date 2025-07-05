import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if this is a request to download an Excel file
    if (req.headers.has('Accept') && req.headers.get('Accept') === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      // Clone the request without withCredentials flag
      const requestWithoutCredentials = req.clone({
        withCredentials: false,
      });

      return next.handle(requestWithoutCredentials);
    }

    // Continue handling other requests as usual
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];