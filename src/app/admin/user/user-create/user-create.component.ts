import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { AlertModel, EventBusService } from 'pay-lib';

import { UserModel } from './../../../../shared/models/user.model';
import { UserService } from './../../../../shared/services/user.service';
import { ErrorService } from './../../../../shared/services/error.service';

@Component({
	selector: 'app-user-create',
	templateUrl: './user-create.component.html',
	styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
	@ViewChild('userForm', { static: true }) userForm: NgForm;
	@Input() data: UserModel;

	alertData: AlertModel;
	roles: Array<any> = [
		{
			value: 'Admin',
			key: 'Admin'
		}, {
			key: 'Employee',
			value: 'Employee'
		}
	];
	statuses: Array<any> = [
		{
			value: 1,
			key: 'Active'
		}, {
			key: 'DeActive',
			value: 0
		}
	];
	formErrors = {
		first_name: '',
		last_name: '',
		role: ''
	};

	validationMessages = {
		'first_name': {
			'required': 'First Name is required.'
		},
		'last_name': {
			'required': 'Last Name is required.'
		},
		'role': {
			'required': 'Role is required.'
		}
	}

	userFormGroup: FormGroup;

	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private eventBusService: EventBusService,
		private errorService: ErrorService
	) { }

	ngOnInit() {
		this.buildForm();
		if (this.data) {
			this.userFormGroup.patchValue({
				...this.data
			});
			this.userFormGroup.get('email_id').disable();
		}
	}
	
	buildForm() {
		this.userFormGroup = this.fb.group({
			id: [''],
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			email_id: [''],
			employee_code: [''],
			username: [''],
			role: [''],
			status: [1]
		});
		this.userFormGroup.valueChanges.subscribe(data => this.onValueChanged);
		this.onValueChanged();
	}

	onValueChanged(data?: any) {
		if (!this.userFormGroup) { return; }
		const form = this.userFormGroup;
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
		this.onValueChanged(this.userFormGroup.value);
	}

	onSubmit() {
		let formValue = this.userFormGroup.value;
		let userModel: UserModel = {
			...formValue
		};
		if (userModel.id) {
			this.update(userModel);
		} else {
			this.create(userModel);
		}
	}

	create(userModel: UserModel) {
		this.userService.create(userModel).subscribe(
			res => {
				if (res['statusCode'] === 200) {

					this.alertData = new AlertModel({
						message: res['message'],
						className: 'alert-success'
					});

					this.userForm.resetForm();

				} else {
					this.alertData = new AlertModel({
						message: res['message'],
						className: 'alert-danger'
					});
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	update(userModel: UserModel) {
		this.userService.update(userModel).subscribe(
			res => {
				if (res['statusCode'] === 200) {
					this.alertData = new AlertModel({
						message: res['message'],
						className: 'alert-success'
					});
					this.eventBusService.publish('record_saved', {
						action: 'updated',
						record: res['data']
					});
				} else {
					this.alertData = new AlertModel({
						message: res['message'],
						className: 'alert-danger'
					});
				}
			},
			error => {
				console.log(error);
			}
		);
		}
}
