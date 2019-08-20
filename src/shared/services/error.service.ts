import { Injectable } from '@angular/core';

import { MatDialogRef } from '@angular/material';

import { DialogService, DialogModel, ButtonActionItem, BUTTON_TYPE, DialogComponent } from 'pay-lib';


@Injectable()
export class ErrorService {
    dialogRef: MatDialogRef<DialogComponent>;

	constructor(
        private dialogService: DialogService
    ) { }

	public handleError(error: DialogModel, callback?: Function) {
        let dialogModel = new DialogModel({
            ...error,
            actions: [
                new ButtonActionItem({
                    type: BUTTON_TYPE.MAT_RAISED_BUTTON,
                    label: 'Ok',
                    handler: () => {
                        this.dialogRef.close();
                    },
                    color: 'primary'
                })
            ]
        })
        this.openDialog(dialogModel, callback);
    }
    
    private openDialog(dialogData: DialogModel, callback?: Function) {
        if(this.dialogRef) {
            this.dialogRef.close();
        }
        this.dialogRef = this.dialogService.openDialog(dialogData);
    }

}
