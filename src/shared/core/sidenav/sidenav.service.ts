import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { Subject } from 'rxjs';

import { SidenavModel } from './sidenav.model';

@Injectable()
export class SidenavService {
	public inputData$ = new Subject<SidenavModel>();
	public injectComponent$ = new Subject<SidenavModel>();
	public outputData$ = new Subject<any>();
	private sidenav: MatSidenav;

	constructor() {}

	public injectComponent(data: SidenavModel) {
		this.injectComponent$.next(data);
	}

	public publishInput(data: any) {
		this.inputData$.next(data);
	}

	public publishOutput(data: any) {
		this.outputData$.next(data);
	}

	public setSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}

	public open() {
		return this.sidenav.open();
	}

	public close() {
		return this.sidenav.close();
	}

	public toggle(): void {
		this.sidenav.toggle();
	}
}
