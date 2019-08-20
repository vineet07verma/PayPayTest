import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from 'pay-lib';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from '../shared/services/error.service';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
	constructor(
		private router: Router,
		private authenticationService: AuthenticationService,
		private errorService: ErrorService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let headers = this.appendHeaders(req);
		const changedReq = req.clone({
			headers: headers
		});
		return next.handle(changedReq).pipe(
			map(response => {
				if (response['body'] && response['body']['statusCode'] !== 200) {
					this.showError({
						title: (response['body']['statusCode']) ? 'Error ' + response['body']['statusCode'] : 'Error',
						message: (response['body']['message'] && response['body']['message'].length > 0) ? response['body']['message'] : 'Something Went Wrong!!'
					});
				}
				return response;
			}),
			catchError(err => {
				console.log(err);
				if (err['status'] === 401) {
					this.showError({
						title: (err['status']) ? 'Error ' + err['status'] : 'Error',
						message: 'Session Expired. Please login again to countinue.'
					});
					this.authenticationService.deleteAuthDetails();
					this.router.navigateByUrl('/');
				} else {
					this.showError({
						title: (err['status']) ? 'Error ' + err['status'] : 'Error',
						message: (err['message']) ? err['message'] : 'Server Error!!'
					});
				}
				return throwError(err);
			})
		);
	}

	private appendHeaders(req: HttpRequest<any>): HttpHeaders {
		let contentType = req.headers.get('Content-Type');
		let token = this.authenticationService.getAuthToken();

		let headers = req.headers.set('Content-Type', (contentType !== undefined && contentType !== null) ? contentType : 'application/json'); //immutable headers object

		if (token !== undefined && token !== null) {
			headers = headers.set('Authorization', token); //immutable headers object.
		}
		return headers;
	}

	private showError(error) {
		this.errorService.handleError(error);
	}
}