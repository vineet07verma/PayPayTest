import { Component, Inject, OnInit, Input } from '@angular/core';
import { AlertModel } from './../../core/models/alert.model';

@Component({
	selector: 'alert-component',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

	showAlert: boolean = false;

	@Input() data: AlertModel;

	constructor() { }

	ngOnInit() { }

	ngOnChanges(changes) {
		if (this.data.message.length) {
			this.showAlert = true;
			if( this.data.autoDismissable ) {
				setTimeout(() => {
					this.showAlert = false;
				}, this.data.duration);
			}
		}
	}
}