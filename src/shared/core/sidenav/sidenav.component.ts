import { Component, ViewChild, OnInit, ViewEncapsulation, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { SidenavService } from './sidenav.service';
import { SidenavModel } from './sidenav.model';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {
	@ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
	@ViewChild('target', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef;

	componentRef: ComponentRef<any>;
	options: SidenavModel = new SidenavModel();

	constructor(
		public sidenavService: SidenavService,
		private resolver: ComponentFactoryResolver
	) {
		this.sidenavService.injectComponent$.subscribe((options: SidenavModel) => {
			this.removeComponent();
			this.addComponent(options);
		});

		this.sidenavService.inputData$.subscribe((inputData) => {
			if(this.componentRef) {
				this.componentRef.instance.data = inputData;
				this.componentRef.instance.ngOnInit();
			}
		});
	}

	ngOnInit() {
		this.sidenavService.setSidenav(this.sidenav);
	}

	addComponent(options: SidenavModel) {
		this.options = options;
		const factory = this.resolver.resolveComponentFactory(this.options.component);
		this.componentRef = this.vcRef.createComponent(factory);
		if(this.options.componentData) {
			this.componentRef.instance.data = this.options.componentData;
		}
	}

	removeComponent() {
		if (this.vcRef.length) {
			this.vcRef.remove(0);
		}
	}

	close() {
		this.sidenavService.close();
	}
}
