import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { PendingInterceptorService } from '../pending-interceptor.service';
import { EventBusService } from './../../../core/services/event-bus.service';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

	public isSpinnerVisible: boolean;
	private subscription: Subscription;

	@Input() backgroundColor: string;
	@Input() filteredUrlPatterns: string[] = [];

	constructor(
		private pendingRequestInterceptorService: PendingInterceptorService,
		private eventBusService: EventBusService
	) {
		this.subscription = this.pendingRequestInterceptorService.pendingRequestsStatus
			.subscribe(hasPendingRequests => {
				this.isSpinnerVisible = hasPendingRequests;
			});

		//added so that spinner can be visible for custom requirements
		this.eventBusService.subscribe('showHideLoader', (value: boolean) => {
			if( this.pendingRequestInterceptorService.pendingRequests === 0 ) {
				this.isSpinnerVisible = value;
			}
		});
	}

	ngOnInit(): void {
		if (!(this.filteredUrlPatterns instanceof Array)) {
			throw new TypeError('`filteredUrlPatterns` must be an array.');
		}

		if (!!this.filteredUrlPatterns.length) {
			this.filteredUrlPatterns.forEach(e => {
				this.pendingRequestInterceptorService.filteredUrlPatterns.push(new RegExp(e));
			});
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
		this.eventBusService.unsubscribe('showHideLoader');
	}

}
