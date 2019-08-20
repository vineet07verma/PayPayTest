import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { DialogModel } from '../../core/models/dialog.model';
import { DialogComponent } from './../../modules/dialog/dialog.component';

@Injectable()
export class DialogService {
	dialogRef: MatDialogRef<DialogComponent>;

	constructor(
		private dialog: MatDialog,
	) {}

	public openDialog(dialogData: DialogModel): MatDialogRef<DialogComponent> {
		let options = new DialogModel(dialogData);
		this.dialogRef = this.dialog.open(DialogComponent, {
			data: options,
			width: options.width
		});
		return this.dialogRef;
	}

	public closeDialog() {
		this.dialogRef.close();
	}
}
