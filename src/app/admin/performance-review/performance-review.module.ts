import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule, MatDatepickerModule } from '@angular/material';

import { TableModule, AlertModule, DialogModule } from 'pay-lib';

import { PerformanceReviewRoutingModule } from './performance-review-routing.module';
import { PerformanceReviewListComponent } from './performance-review-list/performance-review-list.component';
import { PerformanceReviewCreateComponent } from './performance-review-create/performance-review-create.component';

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
		PerformanceReviewRoutingModule,
		DialogModule,
		MatDatepickerModule
	],
	declarations: [
		PerformanceReviewListComponent,
		PerformanceReviewCreateComponent
	],
	providers: [
	],
	entryComponents: [
		PerformanceReviewCreateComponent
	]
})
export class PerformanceReviewModule { }