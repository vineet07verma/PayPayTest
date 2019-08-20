import { Component, OnInit, Input } from '@angular/core';

import { ITableHeaderItem } from '../../../../core/interfaces/index';

@Component({
	selector: 'app-table-cell-default',
	templateUrl: './table-cell-default.component.html',
	styleUrls: ['./table-cell-default.component.scss']
})
export class TableCellDefaultComponent implements OnInit {

	@Input() data: any;

	constructor() { }

	ngOnInit() {
	}

}
