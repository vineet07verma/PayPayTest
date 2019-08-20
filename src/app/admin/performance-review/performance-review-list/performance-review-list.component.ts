import { Component, OnInit } from '@angular/core';

import { ITableHeaderItem, ALIGNMENT, ButtonActionItem, BUTTON_TYPE, DialogService, EventBusService, FIELD_TYPE, SnackbarService } from 'pay-lib';

import { PerformanceReviewCreateComponent } from './../performance-review-create/performance-review-create.component';
import { PerformanceReviewModel } from './../../../../shared/models/performance-review.model';
import { PerformanceReviewService } from './../../../../shared/services/index';

@Component({
	selector: 'app-performance-review-list',
	templateUrl: './performance-review-list.component.html',
	styleUrls: ['./performance-review-list.component.scss']
})
export class PerformanceReviewListComponent implements OnInit {
	subscription: any
	tableData: Array<PerformanceReviewModel> = [];
	tableHeaders: Array<ITableHeaderItem> = [
		{ label: 'Title', field: 'title', align: ALIGNMENT.LEFT, width: '20%' },
		{ label: 'Primary Goals', field: 'exercpt_primary_goal', sortingRequired: true, align: ALIGNMENT.LEFT, width: '15%' },
		{ label: 'Secondary Goals', field: 'exercpt_secondary_goal', sortingRequired: true, align: ALIGNMENT.LEFT, width: '15%' },
		{ label: 'Employee', field: 'employee_code', sortingRequired: true, align: ALIGNMENT.LEFT, width: '12%' },
		{ label: 'Reviewer', field: 'reviewer', sortingRequired: true, align: ALIGNMENT.LEFT, width: '12%' },
		{ label: 'Completed Date', field: 'complete_date', align: ALIGNMENT.LEFT, sortingRequired: true, width: '15%' },
		{ label: 'Status', field: 'status', align: ALIGNMENT.LEFT, sortingRequired: true, width: '12%' },
		{ label: 'Action', field: 'ACTION', sortingRequired: true,  fieldType: FIELD_TYPE.ACTION, align: ALIGNMENT.LEFT, width: '13%' }
	];

	constructor(
		private performanceReviewService: PerformanceReviewService,
		private dialogService: DialogService,
		private eventBusService: EventBusService,
		private snackbarService: SnackbarService
	) {	}

	ngOnInit() {
		this.gerReviews();
		this.subscription = this.eventBusService.subscribe('record_saved', (data) => {
			let PerformanceReviewModel = this.getReviewModel(data['record']);
			if (data['action'] === 'created') {
				this.tableData.unshift(PerformanceReviewModel);
			} else {
				this.tableData.forEach((item, key) => {
					if (item.id === PerformanceReviewModel.id) {
						this.tableData[key] = PerformanceReviewModel;
					}
				});
			}
			this.tableData = [...this.tableData];
		});
	}

	gerReviews() {
		this.performanceReviewService.getReviews().subscribe(
			res => {
				if (res['statusCode'] === 200) {
					this.tableData = [];
					res['data'].forEach((record: any) => {
						this.tableData.push(this.getReviewModel(record));
					});
					this.tableData = [...this.tableData];
				}
			},
			error => {
				console.log(error);
			}
		);
	}
	getReviewModel(record: any): PerformanceReviewModel {
		let performanceReviewModel = new PerformanceReviewModel(record);
		performanceReviewModel['ACTION'] = [
			new ButtonActionItem({
				label: 'Edit',
				type: BUTTON_TYPE.MAT_ICON_BUTTON,
				icon: 'edit',
				handler: () => {
					this.openDialog(new PerformanceReviewModel(record));
				}
			}),
			new ButtonActionItem({
				label: 'Delete',
				type: BUTTON_TYPE.MAT_ICON_BUTTON,
				icon: 'delete',
				handler: () => {
					this.onDeleteHanlder(record.id);
				}
			})
		];
		return performanceReviewModel;
	}

	openDialog(data?: PerformanceReviewModel) {
		let dialogModelData = {
			title: data ? 'Edit Review' : 'Add Review',
			component: PerformanceReviewCreateComponent,
			width: '700px'
		}
		if (data) {
			dialogModelData['componentData'] = data;
		}
		this.dialogService.openDialog(dialogModelData);
	}

	onDeleteHanlder(rowId: string) {
		this.dialogService.openDialog({
			title: 'Delete',
			message: 'Are you sure, you want to delete the record?',
			actions: [
				{
					type: BUTTON_TYPE.MAT_RAISED_BUTTON,
					label: 'Ok',
					handler: () => {
						this.deleteReview(rowId);
					},
					color: 'primary'
				},
				{
					type: BUTTON_TYPE.MAT_RAISED_BUTTON,
					label: 'Cancel',
					handler: () => {
						this.dialogService.closeDialog();
					},
					color: 'basic'
				}
			]
		});
	}

	deleteReview(rowId: string) {
		this.performanceReviewService.delete(rowId).subscribe(
			res => {
				if (res['statusCode'] === 200) {
					this.tableData = this.tableData.filter(record => {
						return record['id'].toString() !== rowId;
					});
					this.dialogService.closeDialog();
					this.showSnackbar(res);
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	showSnackbar(res: Object) {
		this.snackbarService.show({
			message: res['message'],
			action: {
				title: 'Ok',
				handler: () => {
					console.log('closed');
				}
			}
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
