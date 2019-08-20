import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

import { SnackbarModel } from '../../core/models/snackbar.model';
import { SnackbarComponent } from './../../modules/snackbar/snackbar.component';

@Injectable()
export class SnackbarService {

	constructor(
		private snackBar: MatSnackBar
	) { }

	/* open(options) {
		this.snackBarRef = this.snackBar.open(
			options.message,
			options.action.title,
			{
				duration: (options.duration !== undefined) ? options.duration : 2500
			}
		);

		if(options.action) {
			this.snackBarRef.onAction().subscribe(() => {
				options.action.handler();
			});
		}
	} */

	show(options: SnackbarModel) {
		let snackBarRef: MatSnackBarRef<SnackbarComponent> = this.snackBar.openFromComponent(SnackbarComponent, {
			data: {
				message: options.message,
				action: options.action
			}, 
			duration: (options.duration !== undefined) ? options.duration : 2500
		});

		snackBarRef.instance.snackBarRef = snackBarRef;

		if(options.action) {
			snackBarRef.onAction().subscribe(() => {
				options.action.handler();
			});
		}
	}
}
