import { Component, OnInit } from '@angular/core';

import { ITableHeaderItem, ALIGNMENT, DialogService, EventBusService, SnackbarService } from 'pay-lib';

import { PerformanceReviewModel } from './../../../shared/models/performance-review.model';
import { PerformanceReviewService } from './../../../shared/services/index';
import { AssessmentReviewFeedbackComponent } from '../assessment-review-feedback/assessment-review-feedback.component';

@Component({
	selector: 'app-assessment-review-list',
	templateUrl: './assessment-review-list.component.html',
	styleUrls: ['./assessment-review-list.component.scss']
})
export class AssessmentReviewListComponent implements OnInit {
	subscription: any
	tableData: Array<PerformanceReviewModel> = [];
	tableHeaders: Array<ITableHeaderItem> = [
		{ label: 'Title', field: 'title', align: ALIGNMENT.LEFT, width: '20%' },
		{ label: 'Primary Goals', field: 'exercpt_primary_goal', sortingRequired: true, align: ALIGNMENT.LEFT, width: '15%' },
		{ label: 'Secondary Goals', field: 'exercpt_secondary_goal', sortingRequired: true, align: ALIGNMENT.LEFT, width: '15%' },
		{ label: 'Employee', field: 'employee_code', sortingRequired: true, align: ALIGNMENT.LEFT, width: '12%' },
		{ label: 'Completed Date', field: 'complete_date', align: ALIGNMENT.LEFT, sortingRequired: true, width: '15%' },
		{ label: 'Status', field: 'status', align: ALIGNMENT.LEFT, sortingRequired: true, width: '12%' }
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
		return new PerformanceReviewModel(record);
	}

	onRowClicked(rowEvent: PerformanceReviewModel) {
		console.log('clicked');
		this.openDialog(rowEvent);
	}

	openDialog(data?: PerformanceReviewModel) {
		let dialogModelData = {
			title: 'Assessment of Review',
			component: AssessmentReviewFeedbackComponent,
			width: '700px'
		}
		if (data) {
			dialogModelData['componentData'] = data;
		}
		this.dialogService.openDialog(dialogModelData);
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
