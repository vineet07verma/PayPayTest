import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material';

import { TableCellEditComponent } from '../table-cell-edit.component';
import { FIELD_EVENT_TYPE, TableFieldEvent } from '../../../../../core/models/index';

@Component({
	selector: 'app-table-cell-edit-select',
	templateUrl: './table-cell-edit-select.component.html',
	styleUrls: ['./table-cell-edit-select.component.css']
})
export class TableCellEditSelectComponent extends TableCellEditComponent implements OnInit {

	formControl = new FormControl('');
	validate: ErrorStateMatcher = {
		isErrorState: (control: FormControl) => {
			if(this.editError) {
				return true;
			}	
			return false;
		}
	};

	openedChanged($event, element) {
		if(!$event && element) {
			this.onFieldEvent.emit(new TableFieldEvent({
				element: element,
				eventType: FIELD_EVENT_TYPE.CHANGE,
				value: this.formControl.value
			}));
		}
	}

	ngOnInit() {
		this.formControl.setValue(this.editData);
	}

}
