import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule, MatChipsModule } from '@angular/material';

import { DirectivesModule } from './../directives.module';
import { CommentsComponent } from './comments.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
	declarations: [
		CommentsComponent,
		CommentComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatChipsModule,
		DirectivesModule
	],
	exports: [
		CommentsComponent
	]
})
export class CommentsModule { }
