import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule, MatDatepickerModule } from '@angular/material';

import { TableModule, AlertModule, DialogModule } from 'pay-lib';
import { AssessmentReviewFeedbackComponent } from './assessment-review-feedback/assessment-review-feedback.component';
import { AssessmentReviewListComponent } from './assessment-review-list/assessment-review-list.component';
import { AssessmentReviewRoutingModule } from './assessmnet-review-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		MatCheckboxModule,
		MatButtonModule,
		TableModule,
		AlertModule,
		DialogModule,
		MatDatepickerModule,
		AssessmentReviewRoutingModule
	],
	declarations: [
		AssessmentReviewListComponent,
		AssessmentReviewFeedbackComponent
	],
	providers: [
	],
	entryComponents: [
		AssessmentReviewFeedbackComponent
	]
})
export class AssessmentReviewModule { 
	constructor() {
		console.log('Hello');
	}
}