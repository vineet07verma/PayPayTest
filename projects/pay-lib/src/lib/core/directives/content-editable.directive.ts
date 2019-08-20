import { Directive, ElementRef, Input, Output, EventEmitter, OnChanges } from "@angular/core";

@Directive({
	selector: '[contenteditableModel]',
	host: {
		'(blur)': 'onEdit()',
		'(keyup)': 'onKeyUp()'
	}
})
export class ContentEditableDirective implements OnChanges {
	@Input() maxCharLength: number;
	@Input('contenteditableModel') model: any;
	@Input() placeholder: string;
	@Output('contenteditableModelChange') update = new EventEmitter();

	constructor(
		private elementRef: ElementRef
	) { }

	ngOnChanges(changes) {
		/* if (changes.model.isFirstChange()) {
			this.refreshView();
		} */
		this.refreshView();
	}

	onEdit() {
		var value = this.elementRef.nativeElement.innerText;
		if(value.length) {
			this.update.emit(value);
		} else {
			this.elementRef.nativeElement.textContent = this.placeholder;
			this.update.emit(this.placeholder);
		}
	}

	onKeyUp() {
		if(this.maxCharLength) {
			var value = this.elementRef.nativeElement.innerText;
			if(value.length > this.maxCharLength) {
				value = value.substr(0, this.maxCharLength);
				this.elementRef.nativeElement.textContent = value;
				this.update.emit(value);
			}
		}
	}

	private refreshView() {
		this.elementRef.nativeElement.textContent = this.model;
	}
}