import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';

@Injectable()
export class PendingInterceptorService implements HttpInterceptor {
	private _pendingRequests = 0;
    private _pendingRequestsStatus: Subject<boolean> = new Subject<boolean>();
    private _filteredUrlPatterns: RegExp[] = [];

    get pendingRequestsStatus(): Observable<boolean> {
        return this._pendingRequestsStatus.asObservable();
    }

    get pendingRequests(): number {
        return this._pendingRequests;
    }

    get filteredUrlPatterns(): RegExp[] {
        return this._filteredUrlPatterns;
    }

    private shouldBypass(url: string): boolean {
        return this._filteredUrlPatterns.some(e => {
            return e.test(url);
        });
	}
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const shouldBypass = this.shouldBypass(req.url);		
		if (!shouldBypass) {
			this._pendingRequests++;

			if (this._pendingRequests === 1) {
				this._pendingRequestsStatus.next(true);
			}
		}

		return next.handle(req)
			.pipe(
				map(event => event),
				catchError(err => throwError(err)),
				finalize(() => {
					if (!shouldBypass) {
						this._pendingRequests--;
	
						if (this._pendingRequests === 0) {
							this._pendingRequestsStatus.next(false);
						}
					}
				})
			);
	}
}

export function PendingInterceptorServiceFactory() {
    return new PendingInterceptorService();
}

export let PendingInterceptorServiceFactoryProvider = {
    provide: PendingInterceptorService,
    useFactory: PendingInterceptorServiceFactory
};