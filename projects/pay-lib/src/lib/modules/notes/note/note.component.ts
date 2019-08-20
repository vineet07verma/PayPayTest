import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { NoteModel } from './../note.model';

@Component({
	selector: 'app-note',
	templateUrl: './note.component.html',
	styleUrls: ['../../comments/comment/comment.component.scss', './note.component.scss'],
	host: { 'class': 'comment-container' }
})
export class NoteComponent implements OnInit {
	@Input() note: NoteModel;

	constructor() { }

	ngOnInit() {
		
	}

}
