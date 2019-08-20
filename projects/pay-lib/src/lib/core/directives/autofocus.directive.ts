import { Directive, OnInit, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[myAutofocus]'
})
export class AutofocusDirective implements OnInit {

	@Input('myAutofocus') shouldFocus: boolean = true;

	constructor(private elementRef: ElementRef) { };

	ngOnInit(): void {
		if(this.shouldFocus) {
			setTimeout(() => {
				this.elementRef.nativeElement.focus();
			}, 100);
		}
	}

}