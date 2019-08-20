import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { URL_CONFIG } from './../config/index';

@Injectable()
export class PerformanceReviewService {

    constructor(
        private http: HttpClient
    ) { }

    getReviews(): Observable<any> {
        return this.http.get(URL_CONFIG.reviewsAPI).pipe(
            map(res => res),
            catchError(this.handleError)
        )
    }

    create(payload: any): Observable<any> {
		return this.http.get(URL_CONFIG.reviewsAPI).pipe(
			map(res => res),
			catchError(this.handleError)
		);
	}

	update(payload: any): Observable<any> {
		return this.http.get(URL_CONFIG.reviewsAPI).pipe(
			map(res => res),
			catchError(this.handleError)
		);
	}

	delete(rowId: string): Observable<any> {
		return this.http.get(URL_CONFIG.reviewsAPI).pipe(
			map(res => res),
			catchError(this.handleError)
		);
	}


    private handleError(error: any): any {
        console.log(error);
        return throwError(error['error'] || 'Server error');
    }
}