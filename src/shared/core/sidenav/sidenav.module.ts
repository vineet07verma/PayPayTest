import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material';

import { SidenavComponent } from './sidenav.component';
import { SidenavService } from './sidenav.service';

@NgModule({
	declarations: [
		SidenavComponent
	],
	imports: [
		MatSidenavModule
	],
	providers: [
		SidenavService
	],
	exports: [
		SidenavComponent
	]
})
export class SidenavModule { }
