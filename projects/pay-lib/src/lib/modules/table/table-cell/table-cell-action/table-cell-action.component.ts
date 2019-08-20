import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { ITableHeaderItem } from '../../../../core/interfaces/index';
import { ButtonActionItem } from './../../../../core/models/index';

@Component({
	selector: 'app-table-cell-action',
	templateUrl: './table-cell-action.component.html',
	styleUrls: ['./table-cell-action.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TableCellActionComponent implements OnInit {

	@Input() data: ButtonActionItem[];

	constructor() { }

	ngOnInit() { }
}
