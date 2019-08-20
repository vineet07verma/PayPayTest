import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarConfig, MatSnackBarRef } from '@angular/material';
import { SnackbarModel } from '../../core/models/snackbar.model';

@Component({
	selector: 'app-snackbar',
	templateUrl: './snackbar.component.html',
	styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

	snackBarRef: MatSnackBarRef<SnackbarComponent>;

	constructor(
		@Inject(MAT_SNACK_BAR_DATA) public options: SnackbarModel
	) { }

	ngOnInit() {
	}

	onActionClicked(): void {
		this.snackBarRef.dismissWithAction();
	}

}
