import { NgModule } from '@angular/core';

import { AutofocusDirective, ContentEditableDirective } from '../core/directives/index';

@NgModule({
	imports: [],
	declarations: [
		AutofocusDirective,
		ContentEditableDirective
	],
	exports: [
		AutofocusDirective,
		ContentEditableDirective
	]
})
export class DirectivesModule {
}