import { Injectable, Inject, InjectionToken } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { finalize } from 'rxjs/operators';

import { ILoadingService } from '../interfaces/loading.interface';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    @Inject(LOADING_SERVICE_INJECTOR) private _loading: ILoadingService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._loading.setLoading(true, request.url);

    const token = localStorage.getItem('token');
    if (token) {
      const headers = request.headers.set('X-Jwt-Token', `Bearer ${JSON.parse(token)}`);
      request = request.clone({ headers });
    }

    return next.handle(request).pipe(
      finalize(() => {
        this._loading.setLoading(false, request.url);
      })
    );
  }
}


export const LOADING_SERVICE_INJECTOR = new InjectionToken<ILoadingService>(
    'LOADING_SERVICE_INJECTOR'
);