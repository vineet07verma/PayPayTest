import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { NotesComponent } from './notes.component';
import { NoteComponent } from './note/note.component';
import { StatusChipModule } from './../status-chip/status-chip.module';

@NgModule({
	declarations: [
		NotesComponent,
		NoteComponent
	],
	imports: [
		CommonModule,
		StatusChipModule,
		MatIconModule
	],
	exports: [
		NotesComponent
	]
})
export class NotesModule { }
