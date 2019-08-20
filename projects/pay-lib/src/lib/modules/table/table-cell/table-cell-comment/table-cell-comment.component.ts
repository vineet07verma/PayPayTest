import { Component, OnInit, Input } from '@angular/core';
import { NotificationModel } from './../../../../core/models/index';

@Component({
	selector: 'app-table-cell-comment',
	templateUrl: './table-cell-comment.component.html',
	styleUrls: ['./table-cell-comment.component.scss']
})
export class TableCellCommentComponent implements OnInit {

	@Input() data: {
		data: string,
		notification: NotificationModel
	};

	constructor() { }

	ngOnInit() {

	}

}
