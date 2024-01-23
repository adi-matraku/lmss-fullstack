import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LangInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const lang = localStorage.getItem('lang') || 'en';

    request = request.clone({
      setHeaders: {
        'Accept-Language': lang
      }
    });

    return next.handle(request);
  }
}
