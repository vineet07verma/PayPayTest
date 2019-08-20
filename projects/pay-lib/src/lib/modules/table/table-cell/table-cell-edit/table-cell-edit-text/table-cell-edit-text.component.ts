import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material';

import { TableCellEditComponent } from '../table-cell-edit.component';

@Component({
	selector: 'app-table-cell-edit-text',
	templateUrl: './table-cell-edit-text.component.html',
	styleUrls: ['./table-cell-edit-text.component.css']
})
export class TableCellEditTextComponent extends TableCellEditComponent implements OnInit {

	formControl = new FormControl('');
	validate: ErrorStateMatcher = {
		isErrorState: (control: FormControl) => {
			if(this.editError) {
				return true;
			}	
			return false;
		}
	};

	ngOnInit() {
		this.formControl.setValue(this.editData);
	}

}
