import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
	declarations: [
		AdminComponent
	],
	imports: [
		CommonModule,
		MatListModule,
		AdminRoutingModule
	],
	providers: [
	]
})
export class AdminModule { }
