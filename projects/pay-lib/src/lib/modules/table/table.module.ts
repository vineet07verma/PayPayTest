import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CdkTableModule } from '@angular/cdk/table';

import { MaterialModule } from '../material.module';
import { ButtonModule } from './../button/button.module';
import { NotificationModule } from './../notification/notification.module';
import { TableComponent } from './table.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TableCellDefaultComponent } from './table-cell/table-cell-default/table-cell-default.component';
import { TableCellEditComponent } from './table-cell/table-cell-edit/table-cell-edit.component';
import { TableCellEditTextComponent } from './table-cell/table-cell-edit/table-cell-edit-text/table-cell-edit-text.component';
import { TableCellEditSelectComponent } from './table-cell/table-cell-edit/table-cell-edit-select/table-cell-edit-select.component';
import { TableCellEditFileComponent } from './table-cell/table-cell-edit/table-cell-edit-file/table-cell-edit-file.component';
import { TableCellActionComponent } from './table-cell/table-cell-action/table-cell-action.component';
import { TableCellCommentComponent } from './table-cell/table-cell-comment/table-cell-comment.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        CdkTableModule,
        ButtonModule,
        NotificationModule
    ],
    declarations: [
        TableComponent,
        TableCellComponent,
        TableCellDefaultComponent,
        TableCellEditComponent,
        TableCellEditTextComponent,
        TableCellEditSelectComponent,
        TableCellEditFileComponent,
        TableCellActionComponent,
        TableCellCommentComponent
    ],
    entryComponents: [
        TableCellDefaultComponent,
        TableCellEditTextComponent,
        TableCellEditSelectComponent,
        TableCellEditFileComponent,
        TableCellActionComponent,
        TableCellCommentComponent
    ],
    exports: [
        TableComponent
    ],
    providers: [
    ]
})
export class TableModule { }
