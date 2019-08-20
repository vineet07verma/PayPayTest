import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard.service';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		resolve: [AuthGuard]
	},
	{
		path: 'admin',
		loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
		canLoad: [AuthGuard]
	},
	{
		path: 'reviews',
		loadChildren: () => import('./assessment-review/assessment-review.module').then(m => m.AssessmentReviewModule),
		canLoad: [AuthGuard]
	},
	{
		path: '',
		component: LoginComponent,
		resolve: [AuthGuard]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
