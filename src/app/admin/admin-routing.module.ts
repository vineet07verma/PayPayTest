import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthGuard } from '../auth/auth.guard.service';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: 'user',
				loadChildren: () => import('./user/user.module').then(m => m.UserModule)
			},
			{
				path: 'reviews',
				loadChildren: () => import('./performance-review/performance-review.module').then(m => m.PerformanceReviewModule)
			},
			{
				path: '', redirectTo: 'user', pathMatch: 'full'
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
