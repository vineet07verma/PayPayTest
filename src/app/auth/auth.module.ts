import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatButtonModule } from '@angular/material';

import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard.service';

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule,
		MatInputModule,
		MatButtonModule
	],
	exports: [
		LoginComponent
	],
	providers: [
		AuthGuard,
		AuthService
	]
})
export class AuthModule { }
