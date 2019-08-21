import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { DialogService, SnackbarService } from 'pay-lib';

import { PerformanceReviewModel } from './../../../shared/models/index';
import { PerformanceReviewService} from '../../../shared/services/index';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-assessment-review-feedback',
	templateUrl: './assessment-review-feedback.component.html',
	styleUrls: ['./assessment-review-feedback.component.scss']
})
export class AssessmentReviewFeedbackComponent implements OnInit {
	@ViewChild('performanceForm', { static: true }) performanceForm: NgForm;
	@Input() data: PerformanceReviewModel;
	constructor(
		private performanceReviewService: PerformanceReviewService,
		private dialogService: DialogService,
		private snackbarService: SnackbarService
	) { }

	ngOnInit() {
		
	}

	updateReview(feedback: string) {
		this.data.feedback = feedback;
		this.data.status = 'Completed';
		console.log(this.data);
		this.performanceReviewService.update(this.data).subscribe(
			res => {
				if (res['statusCode'] === 200) {
					this.snackbarService.show(res);
					this.dialogService.closeDialog();
				}
			},
			error => {
				console.log(error);
			}
		);
	}
}
