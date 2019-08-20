import { Input, Output, Component, ViewChild, EventEmitter, OnInit, AfterViewInit, OnChanges, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, Sort, PageEvent, SortDirection, MatSortable } from '@angular/material';

import { ALIGNMENT, FIELD_TYPE, ORDER } from '../../core/constants/index';
import { ITableHeaderItem, ITableRowData } from '../../core/interfaces/index';
import { TableFieldEvent, FIELD_EVENT_TYPE, ActionItem, TableAction } from '../../core/models/index';

@Component({
	selector: 'app-table',
	styleUrls: ['./table.component.scss'],
	templateUrl: './table.component.html',
	encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnChanges {
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

	@Input() tableHeader: Array<ITableHeaderItem>;
	@Input() tableData: Array<any>;
	@Input() editableTable: boolean = false;
	@Input() pagination: boolean = false;
	@Input() paginationTopPosition: boolean = false;
	@Input() isPaginationServerSide: boolean = false;
	@Input() isSortingServerSide: boolean = false;
	@Input() pageSizeOptions: Array<any> = [5, 10, 25, 100];
	@Input() hidePageSize: boolean = false;
	@Input() pageIndex: number = 0;
	@Input() pageSize: number = 10;
	@Input() dataCount: number = 0;
	@Input() sorting: boolean = false;
	@Input() rowClickable: boolean = true;
	@Input() singleActions: Array<ActionItem>;

	@Output() onRowClicked: EventEmitter<any> = new EventEmitter();
	@Output() onCellClicked: EventEmitter<any> = new EventEmitter();
	@Output() onOrderChanged: EventEmitter<Sort> = new EventEmitter();
	@Output() onPageChanged: EventEmitter<PageEvent> = new EventEmitter();

	//editable table output events
	@Output() onFieldBlur: EventEmitter<TableFieldEvent> = new EventEmitter();
	@Output() onFieldChanged: EventEmitter<TableFieldEvent> = new EventEmitter();
	@Output() onFieldFocus: EventEmitter<TableFieldEvent> = new EventEmitter();
	@Output() onSingleClick: EventEmitter<TableAction> = new EventEmitter();

	dataSource: MatTableDataSource<any> | null;
	currentSort: Sort = {
		active: '',
		direction: ''
	};

	constructor() {
	}

	ngOnInit() {
		this.tableHeader.forEach((header) => {
			if (header.order !== undefined && header.order !== ORDER.NONE) {
				this.currentSort = {
					active: (header.orderField) ? header.orderField : header.field,
					direction: <SortDirection>header.order
				}
			}
			//setting sortingRequired to true for all headers
			if (this.sorting && header.sortingRequired !== false) {
				header.sortingRequired = true;
			}
		});
	}

	initMatTableDataSource() {
		let data = [...this.tableData];
		this.dataSource = new MatTableDataSource(data);
		this.dataSource.sortingDataAccessor = (item, property) => {
			let itemValue = item[property];
			this.tableHeader.forEach((header) => {
				if (header.orderField) {
					if (header.field === property) {
						itemValue = item[header.orderField];
					}
				}
			});
			return itemValue;
		}

		if (this.pagination && !this.isPaginationServerSide) {
			this.dataSource.paginator = this.paginator;
		}

		if (this.sorting && !this.isSortingServerSide) {
			this.dataSource.sort = this.sort;
		}
	}

	ngAfterViewInit() {
		//passing the table data to datasource
		this.initMatTableDataSource();
		if (this.paginator && this.pagination) {
			this.paginator.page.subscribe((data: PageEvent) => {
				this.onPageChanged.emit(data);
			});
		}

		if (this.sort && this.sorting) {
			this.sort.sortChange.subscribe((data: Sort) => {
				this.currentSort = data;
				this.onOrderChanged.emit(data);
			});
		}
	}

	ngOnChanges() {
		this.initMatTableDataSource();
	}

	fieldEvent(editEvent: TableFieldEvent): void {
		switch (editEvent.eventType) {
			case FIELD_EVENT_TYPE.BLUR:
				this.onFieldBlur.emit(editEvent);
				break;
			case FIELD_EVENT_TYPE.CHANGE:
				this.onFieldChanged.emit(editEvent);
				break;
			case FIELD_EVENT_TYPE.FOCUS:
				this.onFieldFocus.emit(editEvent);
				break;
		}
	}

	getTableHeaderRowDef() {
		let headerRowDef = [];
		this.tableHeader.forEach((row) => {
			if (row.orderField) {
				headerRowDef.push(this.removeSpaces(row.orderField));
			} else {
				headerRowDef.push(this.removeSpaces(row.field));
			}
		});
		if (this.editableTable) {
			headerRowDef.push('action');
		}
		return headerRowDef;
	}

	removeSpaces(str: string): string {
		return str.replace(/\s/g, '');
	}

	getHeaderWidth(header: ITableHeaderItem): string {
		if (header.width) {
			return header.width;
		}
	}

	getAlignClass(header: ITableHeaderItem): string {
		if (header.align == null) {
			header.align = ALIGNMENT.LEFT;
		}
		if (header.align === ALIGNMENT.CENTER) {
			return 'align-center';
		} else if (header.align === ALIGNMENT.RIGHT) {
			return 'align-right';
		}
		return 'align-left';
	}

	getSortClass(header: ITableHeaderItem): string {
		if (this.currentSort.active !== this.removeSpaces((header.orderField) ? header.orderField : header.field) || this.currentSort.direction === ORDER.NONE) {
			return 'fa-sort';
		} else if (this.currentSort.active === this.removeSpaces((header.orderField) ? header.orderField : header.field) && this.currentSort.direction === ORDER.ASCENDING) {
			return 'fa-sort-asc';
		} else {
			return 'fa-sort-desc';
		}
	}

	handleRowClick(row: any) {
		this.tableData.forEach((row) => {
			row.selected = false;
		});
		row.selected = true;
		this.onRowClicked.emit(row);
	}

	handleCellClick(cell: string, value: any) {
		this.onCellClicked.emit({
			label: cell,
			value: value
		});
	}

	singleClick(action: ActionItem, item: ITableRowData): void {
		let tableAction = new TableAction(action);
		tableAction.items = [item];
		this.onSingleClick.emit(tableAction);
	}

	//re-render row
	// as soon as row data will be updated from anyw of the component, method will be executed automatically
	trackBy(index, item) {
		let itm = { ...item };
		return itm;
	}
}
