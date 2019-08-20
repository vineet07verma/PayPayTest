import { Component, Inject, OnInit, Input } from '@angular/core';

import { NotificationModel } from '../../core/models/index';

@Component({
	selector: 'notification-component',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss']
})
export class NotifcationComponent implements OnInit {

	@Input() data: NotificationModel;

	constructor() { }

	ngOnInit() { }
}