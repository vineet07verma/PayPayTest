import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { SnackbarComponent } from './snackbar.component';
import { SnackbarService } from './../../core/services/snackbar.service';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule
	],
	declarations: [
		SnackbarComponent
	],
	entryComponents: [
		SnackbarComponent
	],
	providers: [
		SnackbarService
	]
})
export class SnackbarModule { }
