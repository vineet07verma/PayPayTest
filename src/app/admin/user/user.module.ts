import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule } from '@angular/material';

import { TableModule, AlertModule, DialogModule } from 'pay-lib';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		MatCheckboxModule,
		MatButtonModule,
		TableModule,
		AlertModule,
		UserRoutingModule,
		DialogModule
	],
	declarations: [
		UserListComponent,
		UserCreateComponent
	],
	providers: [ ],
	entryComponents: [
		UserCreateComponent
	]
})
export class UserModule { }