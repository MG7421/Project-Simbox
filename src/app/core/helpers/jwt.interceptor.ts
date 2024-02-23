import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor( private authfackservice: AuthfakeauthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authfackservice.currentUserValue) {
            if (this.authfackservice.currentUserValue.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.authfackservice.currentUserValue.token}`
                    }
                });
            }
        } else {
            // add authorization header with jwt token if available
            const currentUser = this.authfackservice.currentUserValue;
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
            }
        }
        return next.handle(request);
    }
}
