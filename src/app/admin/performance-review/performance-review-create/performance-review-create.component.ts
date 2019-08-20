import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { AlertModel, EventBusService } from 'pay-lib';

import { PerformanceReviewModel } from './../../../../shared/models/index';
import { PerformanceReviewService, ErrorService, UserService } from './../../../../shared/services/index';

@Component({
	selector: 'app-performance-review-create',
	templateUrl: './performance-review-create.component.html',
	styleUrls: ['./performance-review-create.component.scss']
})
export class PerformanceReviewCreateComponent implements OnInit {
	@ViewChild('performanceForm', { static: true }) performanceForm: NgForm;
	@Input() data: PerformanceReviewModel;

	alertData: AlertModel;
	employees: Array<any> = [];
	statuses: Array<any> = [
		{
			value: 'Completed',
			key: 'Completed'
		}, {
			key: 'Pending',
			value: 'pending'
		}
	];
	formErrors = {
		first_name: '',
		last_name: '',
		role: ''
	};

	validationMessages = {
		'title': {
			'required': 'Title is required.'
		},
		'employee_id': {
			'required': 'Employee is required.'
		},
		'reviewer': {
			'required': 'Reviwer is required.'
		}
	}

	performanceFormGroup: FormGroup;

	constructor(
		private fb: FormBuilder,
		private performanceReviewService: PerformanceReviewService,
		private eventBusService: EventBusService,
		private userService: UserService
	) { }

	ngOnInit() {
		setTimeout(() => {
			this.getEmployeesList();
		}, 100);
		
		this.buildForm();
		if (this.data) {
			this.performanceFormGroup.patchValue({
				...this.data
			});
		}
	}

	getEmployeesList() {
		this.userService.getUsers().subscribe(
			res => {
				if(res['statusCode'] === 200) {
					this.employees = [];
					res['data'].filter(user => user.role === 'employee').forEach(employee => {
						this.employees.push({
							key: employee['employee_code']+' - '+employee['first_name']+' '+employee['last_name'],
							value: employee['id']
						})
					});
				}
			}
		)
	}
	
	buildForm() {
		this.performanceFormGroup = this.fb.group({
			id: [''],
			title: ['', Validators.required],
			employee_id: ['', Validators.required],
			reviewer: ['', Validators.required],
			primary_goal: [''],
			secondary_goal: [''],
			complete_date: [''],
			status: [1]
		});
		this.performanceFormGroup.valueChanges.subscribe(data => this.onValueChanged);
		this.onValueChanged();
	}

	onValueChanged(data?: any) {
		if (!this.performanceFormGroup) { return; }
		const form = this.performanceFormGroup;
		for (const field in this.formErrors) {
			// clear previous error message (if any)
			this.formErrors[field] = '';
			const control = form.get(field);
			if (control && control.dirty || control && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.formErrors[field] = messages[key];
				}
			}
		}
	}

	onFocusOut() {
		this.onValueChanged(this.performanceFormGroup.value);
	}

	onSubmit() {
		let formValue = this.performanceFormGroup.value;
		let performanceReviewModel: PerformanceReviewModel = {
			...formValue
		};
		if (performanceReviewModel.id) {
			this.update(performanceReviewModel);
		} else {
			this.create(performanceReviewModel);
		}
	}

	create(PerformanceReviewModel: PerformanceReviewModel) {
		this.performanceReviewService.create(PerformanceReviewModel).subscribe(
			res => {
				if (res['statusCode'] === 200) {

					this.alertData = new AlertModel({
						message: res['message'],
						className: 'alert-success'
					});

					this.performanceForm.resetForm();

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

	update(PerformanceReviewModel: PerformanceReviewModel) {
		this.performanceReviewService.update(PerformanceReviewModel).subscribe(
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
