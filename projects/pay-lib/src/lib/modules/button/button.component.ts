import { Component, Inject, OnInit, Input } from '@angular/core';

import { ITableHeaderItem } from '../../core/interfaces/index';
import { ButtonActionItem } from '../../core/models/index';
import { BUTTON_TYPE } from './../../core/constants/button-type.constants';

@Component({
	selector: 'button-component',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

	@Input() data: ButtonActionItem;
	BUTTON_TYPE = BUTTON_TYPE;

	constructor() { }

	ngOnInit() { }

	onButtonClickHandler(event, action: ButtonActionItem) {
		action.handler();
		event.preventDefault();
		event.stopPropagation();
	}
}