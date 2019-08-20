import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { CommentModel } from '../comment.model';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
	host: { 'class': 'comment-container' }
})
export class CommentComponent implements OnInit {
	@ViewChild('replyInput', { static: false }) replyInput: ElementRef;
	@Input() comment: CommentModel;
	@Input() likeRequired: boolean = true;
	@Input() replyRequired: boolean = true;
	@Output() onReplyPublished: EventEmitter<any> = new EventEmitter();
	@Output() onLiked: EventEmitter<any> = new EventEmitter();

	isReplyVisible: boolean = false;

	constructor() { }

	ngOnInit() {
	}

	toggleReply() {
		this.isReplyVisible = !this.isReplyVisible;
	}

	onLikeHanlder(comment: CommentModel) {
		this.onLiked.emit({
			comment: comment,
			isLiked: !comment.IS_LIKED_BY_ME
		})
	}

	focusOnReply() {
		this.replyInput.nativeElement.focus();
	}

	onReplyHandler(commentId: number) {
		this.onReplyPublished.emit({
			comment: this.replyInput.nativeElement.value,
			commentId: commentId
		});
		this.replyInput.nativeElement.value = '';
	}
}
