import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { CommentModel } from './comment.model';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CommentsComponent implements OnInit {
	@ViewChild('commentInput', { static: false }) commentInput: ElementRef;
	@Input() comments: Array<CommentModel>;
	@Input() likeRequired: boolean = true;
	@Input() replyRequired: boolean = true;
	@Input() commentPlaceholder: string = 'Write a comment...';
	@Output() onCommentPublished: EventEmitter<any> = new EventEmitter();
	@Output() onReplyPublished: EventEmitter<any> = new EventEmitter();
	@Output() onLiked: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	onCommentHandler() {
		this.onCommentPublished.emit({
			comment: this.commentInput.nativeElement.value
		});
		this.commentInput.nativeElement.value = '';
	}

	onReplyHandler(data: any) {
		this.onReplyPublished.emit(data);
	}

	onLikedHandler(data) {
		this.onLiked.emit(data)
	}
}
