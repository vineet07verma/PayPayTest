import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { EventBusService } from 'pay-lib';

import { finalize } from 'rxjs/operators'

import { AuthService } from '../auth.service';
import { ErrorService } from './../../../shared/services/error.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	formErrors = {
		username: '',
		password: ''
	};
	validationMessages = {
		'username': {
			'required': 'Username is required.',
			'invalidEmail': 'Invalid Username.'
		},
		'password': {
			'required': 'Password is required.'
		}
	};

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private authService: AuthService,
		private ngZone: NgZone,
		private eventBusService: EventBusService,
		private errorService: ErrorService
	) { }

	ngOnInit() {
		this.buildForm();
	}

	buildForm() {
		this.loginForm = this.fb.group({
			username: ['', [Validators.required]],
			password: ['', Validators.required]
		});
		this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged(); // (re)set validation messages now
	}

	onValueChanged(data?: any) {
		if (!this.loginForm) { return; }
		const form = this.loginForm;
		for (const field in this.formErrors) {
			// clear previous error message (if any)
			this.formErrors[field] = '';
			const control = form.get(field);
			if (control && control.dirty || !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.formErrors[field] = messages[key];
				}
			}
		}
	}

	onFocusOut() {
		this.onValueChanged(this.loginForm.value);
	}

	submit() {
		this.authService.login(this.loginForm.value).subscribe(
			res => {
				if(res['statusCode'] === 200) {
					if(res['data']['role'] === 'Admin') {
						this.router.navigateByUrl('/admin');
					} else {
						this.router.navigateByUrl('/reviews');
					}
				}
			}
		)
	}

}
