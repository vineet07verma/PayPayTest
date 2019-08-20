import { NgModule } from '@angular/core';

import { TableModule } from './modules/table/table.module';
import { MaterialModule } from './modules/material.module';
import { DialogModule } from './modules/dialog/dialog.module';
import { AlertModule } from './modules/alert/alert.module';
import { SnackbarModule } from './modules/snackbar/snackbar.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { EventBusService } from './core/services/index';
import { DirectivesModule } from './modules/directives.module';
import { CommentsModule } from './modules/comments/comments.module';
import { NotesModule } from './modules/notes/notes.module';
import { StatusChipModule } from './modules/status-chip/status-chip.module';

@NgModule({
	imports: [],
	declarations: [],
	providers: [
		EventBusService
	],
	exports: [
		MaterialModule,
		TableModule,
		DialogModule,
		AlertModule,
		SnackbarModule,
		AuthenticationModule,
		DirectivesModule,
		CommentsModule,
		NotesModule,
		StatusChipModule
	]
})
export class PayLibModule { }

