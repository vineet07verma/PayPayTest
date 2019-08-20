import { Component, Inject, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ViewEncapsulation } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DialogModel } from '../../core/models/dialog.model';

@Component({
	selector: 'dialog-component',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit {

	@ViewChild('target', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef;
	componentRef: ComponentRef<any>;

	constructor(
		public dialogRef: MatDialogRef<DialogComponent>,
		private resolver: ComponentFactoryResolver,
		@Inject(MAT_DIALOG_DATA) public data: DialogModel
	) { }

	ngOnInit() {
		if(this.data.component) {
			const factory = this.resolver.resolveComponentFactory(this.data.component);
			this.componentRef = this.vcRef.createComponent(factory);
			if(this.data.componentData) {
				this.componentRef.instance.data = this.data.componentData;
			}
		}
	}
}