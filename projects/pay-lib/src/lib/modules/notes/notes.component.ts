import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { NoteModel } from './note.model';

@Component({
	selector: 'app-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['../comments/comments.component.scss', './notes.component.scss']
})
export class NotesComponent implements OnInit {
	@ViewChild('noteInput', { static: false }) noteInput: ElementRef;
	@Input() notes: Array<NoteModel>;
	@Input() disabled: boolean = false;
	@Input() placeholder: string = 'Write a note...';
	@Output() onNotePublished: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	onNoteHandler() {
		this.onNotePublished.emit({
			note: this.noteInput.nativeElement.value
		});
		this.noteInput.nativeElement.value = '';
	}
}
