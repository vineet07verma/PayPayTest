import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { ButtonComponent } from './button.component';

@NgModule({
	imports: [
		MaterialModule,
		CommonModule
	],
	declarations: [
		ButtonComponent
	],
	entryComponents: [],
	providers: [
	],
	exports: [
		ButtonComponent
	]
})
export class ButtonModule {
}
