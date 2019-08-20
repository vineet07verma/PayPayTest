import { Component, OnInit, Input, Output, ViewChild, ViewContainerRef, AfterContentInit, EventEmitter, SimpleChanges, ComponentFactoryResolver, ViewEncapsulation } from '@angular/core';

import { FIELD_TYPE, EDIT_TYPE } from '../../../core/constants/index';
import { ITableHeaderItem } from '../../../core/interfaces/index';
import { TableFieldEvent } from '../../../core/models/index';
import { TableCellDefaultComponent } from './table-cell-default/table-cell-default.component';
import { TableCellEditTextComponent } from './table-cell-edit/table-cell-edit-text/table-cell-edit-text.component';
import { TableCellEditSelectComponent } from './table-cell-edit/table-cell-edit-select/table-cell-edit-select.component';
import { TableCellEditFileComponent } from './table-cell-edit/table-cell-edit-file/table-cell-edit-file.component';
import { TableCellActionComponent } from './table-cell-action/table-cell-action.component';
import { TableCellCommentComponent } from './table-cell-comment/table-cell-comment.component';

@Component({
	selector: 'app-table-cell',
	templateUrl: './table-cell.component.html',
	styleUrls: ['./table-cell.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class TableCellComponent implements OnInit, AfterContentInit {

	@ViewChild('output', { read: ViewContainerRef, static: true }) output;
	@Input() cellHeader: ITableHeaderItem;
	@Input() rowData: any;
	//@Input() test: boolean;
	@Input() editableTable: boolean = false;
	@Output() onFieldEvent: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

	private _componentRef;

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver
	) { }

	ngOnInit() {
	}

	ngAfterContentInit(): void {
		this.setOutputComponent();
	}

	setOutputComponent(): Promise<any> {
		return new Promise((resolve) => {
			if (!!this._componentRef) {
				this.output.clear();
			}
			let componentFactory;
			let editComponentType;
			if (this.editableTable && this.rowData.edit && this.cellHeader.editType !== EDIT_TYPE.NONE) {
				switch (this.cellHeader.editType) {
					case EDIT_TYPE.SELECT:
						editComponentType = TableCellEditSelectComponent;
						break;
					case EDIT_TYPE.FILE:
						editComponentType = TableCellEditFileComponent;
						break;
					default:
						editComponentType = TableCellEditTextComponent;
						break;
				}
				componentFactory = this.componentFactoryResolver.resolveComponentFactory(editComponentType);
				this._componentRef = this.output.createComponent(componentFactory);
				this._componentRef.instance.editData = (this.rowData[this.cellHeader.orderField]) ? this.rowData[this.cellHeader.orderField] : this.rowData[this.cellHeader.field];
				this._componentRef.instance.editPlaceholder = this.cellHeader.editPlaceholder;
				this._componentRef.instance.editOptions = this.cellHeader.editOptions;
				this._componentRef.instance.editError = (this.rowData.editError[this.cellHeader.field]) ? this.rowData.editError[this.cellHeader.field] : null;
				this._componentRef.instance.onFieldEvent.subscribe((event: TableFieldEvent) => {
					event.row = this.rowData;
					event.field = this.cellHeader.field;
					this.updateRowData(event);
					this.onFieldEvent.emit(event);
				});
			} else {
				let componentType;
				switch (this.cellHeader.fieldType) {
					case FIELD_TYPE.ACTION:
						componentType = TableCellActionComponent;
						break;
					case FIELD_TYPE.COMMENT:
						componentType = TableCellCommentComponent;
						break;
					default:
						componentType = TableCellDefaultComponent;
						break;
				}
				componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
				this._componentRef = this.output.createComponent(componentFactory);
				this._componentRef.instance.data = this.rowData[this.cellHeader.field];
			}
			resolve(this._componentRef);
			return;
		});
	}

	//updating row data, will be used to kept the row data (value, editedFields) once row will re-rendered through trackBy in table component
	updateRowData(event: TableFieldEvent) {
		this.rowData[event.field] = event.value;
		if (typeof (this.rowData.editedFields) === 'undefined') {
			this.rowData.editedFields = {};
		}
		if (this.rowData.editedFields[event.field] !== event.value) {
			this.rowData.editedFields[event.field] = event.value;
		}
	}

}
