import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { URL_CONFIG } from './../config/index';
import { UserModel } from '../models/index';

@Injectable()
export class UserService {

	constructor(
		private http: HttpClient
	) { }

	getUsers(): Observable<any> {
		return this.http.get(URL_CONFIG.userAPI).pipe(
			map(res => res),
			catchError(this.handleError)
		);
	}

	create(payload: UserModel): Observable<any> {
		return this.http.get(URL_CONFIG.userAPI).pipe(
			map(res => res),
			catchError(this.handleError)
		);
	}

	update(payload: UserModel): Observable<any> {
		return this.http.get(URL_CONFIG.userAPI).pipe(
			map(res => res),
			catchError(this.handleError)
		);
	}

	delete(rowId: string): Observable<any> {
		return this.http.get(URL_CONFIG.userAPI).pipe(
			map(res => res),
			catchError(this.handleError)
		);
	}

	handleError(error: any): any {
		console.log(error);
		return throwError(error['error'] || 'Server error');
	}
}
