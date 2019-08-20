import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformanceReviewListComponent } from './performance-review-list/performance-review-list.component';

const routes: Routes = [
	{
		path: '', redirectTo: 'list', pathMatch: 'full'
	},
	{
		path: 'list', component: PerformanceReviewListComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PerformanceReviewRoutingModule { }
