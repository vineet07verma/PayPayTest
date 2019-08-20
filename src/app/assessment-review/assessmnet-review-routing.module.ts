import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentReviewListComponent } from './assessment-review-list/assessment-review-list.component';

const routes: Routes = [
	{
		path: '', redirectTo: 'list', pathMatch: 'full'
	},
	{
		path: 'list',
		component: AssessmentReviewListComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AssessmentReviewRoutingModule { }
