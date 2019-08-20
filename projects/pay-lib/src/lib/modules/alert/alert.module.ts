import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		AlertComponent
	],
	entryComponents: [],
	providers: [
	],
	exports: [
		AlertComponent
	]
})
export class AlertModule {
}
