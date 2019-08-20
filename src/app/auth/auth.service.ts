import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, from, throwError, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { AuthenticationService } from 'pay-lib';
import { URL_CONFIG } from './../../shared/config/url-config';

@Injectable()
export class AuthService {

	constructor(
        private authenticationService: AuthenticationService,
        private http: HttpClient
	) { }

	login(data): Observable<any> {
        return this.http.get(URL_CONFIG.loginAPI).pipe(
			map(res => {
                this.authenticationService.setAuthDetails(res['token'], res['data']);
                return res;
            }),
			catchError(this.handleError)
		);
    }
    
    private handleError(error) {
        return throwError(error);
    }
}
