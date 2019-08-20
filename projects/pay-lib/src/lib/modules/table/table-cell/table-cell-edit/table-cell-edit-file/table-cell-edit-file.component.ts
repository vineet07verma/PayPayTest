import { Component, OnInit, Input, SimpleChanges, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material';

import { TableCellEditComponent } from '../table-cell-edit.component';

@Component({
	selector: 'app-table-cell-edit-file',
	templateUrl: './table-cell-edit-file.component.html',
	styleUrls: ['./table-cell-edit-file.component.css']
})
export class TableCellEditFileComponent extends TableCellEditComponent {
	formControl = new FormControl('');
}
