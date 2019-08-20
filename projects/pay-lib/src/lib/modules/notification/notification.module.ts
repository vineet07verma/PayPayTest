import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { NotifcationComponent } from './notification.component';

@NgModule({
	imports: [
		MatIconModule,
		CommonModule
	],
	declarations: [
		NotifcationComponent
	],
	exports: [
		NotifcationComponent
	]
})
export class NotificationModule {
}
