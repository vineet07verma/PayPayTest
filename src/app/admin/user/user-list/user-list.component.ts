import { Component, OnInit } from '@angular/core';

import { ITableHeaderItem, ALIGNMENT, ButtonActionItem, BUTTON_TYPE, DialogService, EventBusService, FIELD_TYPE, SnackbarService } from 'pay-lib';


import { UserModel } from './../../../../shared/models/user.model';
import { UserCreateComponent } from './../user-create/user-create.component';
import { UserService } from './../../../../shared/services/user.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
	subscription: any
	tableData: Array<UserModel> = [];
	tableHeaders: Array<ITableHeaderItem> = [
		{ label: 'Email', field: 'email_id', sortingRequired: false, align: ALIGNMENT.LEFT, width: '22%' },
		{ label: 'Username', field: 'username', sortingRequired: false, align: ALIGNMENT.LEFT, width: '12%' },
		{ label: 'Code', field: 'employee_code', sortingRequired: false, align: ALIGNMENT.LEFT, width: '12%' },
		{ label: 'First Name', field: 'first_name', sortingRequired: false, align: ALIGNMENT.LEFT, width: '12%' },
		{ label: 'Last Name', field: 'last_name', align: ALIGNMENT.LEFT, sortingRequired: false, width: '12%' },
		{ label: 'Role', field: 'role', align: ALIGNMENT.LEFT, sortingRequired: false, width: '12%' },
		{ label: 'Status', field: 'statusType', orderField: 'status', sortingRequired: false, align: ALIGNMENT.LEFT, width: '10%' },
		{ label: 'Action', field: 'ACTION', sortingRequired: false,  fieldType: FIELD_TYPE.ACTION, align: ALIGNMENT.LEFT, width: '13%' }
	];

	constructor(
		private userService: UserService,
		private dialogService: DialogService,
		private eventBusService: EventBusService,
		private snackbarService: SnackbarService
	) {	}

	ngOnInit() {
		// GET USERS RECORD
		this.getUsers();
		this.subscription = this.eventBusService.subscribe('record_saved', (data) => {
			let userModel = this.getUserModel(data['record']);
			if (data['action'] === 'created') {
				// this.tableData.unshift(userModel);
			} else {
				this.tableData.forEach((item, key) => {
					if (item.id === userModel.id) {
						this.tableData[key] = userModel;
					}
				});
			}
			this.tableData = [...this.tableData];
		});
	}

	getUsers() {
		this.userService.getUsers().subscribe(
			res => {
				if (res['statusCode'] === 200) {
					this.tableData = [];
					res['data'].forEach((record: any) => {
						this.tableData.push(this.getUserModel(record));
					});
					this.tableData = [...this.tableData];
				}
			},
			error => {
				console.log(error);
			}
		);
	}
	getUserModel(record: any): UserModel {
		let userModel = new UserModel(record);
		userModel['ACTION'] = [
			new ButtonActionItem({
				label: 'Edit',
				type: BUTTON_TYPE.MAT_ICON_BUTTON,
				icon: 'edit',
				handler: () => {
					this.openUserDialog(new UserModel(record));
				}
			}),
			new ButtonActionItem({
				label: 'Delete',
				type: BUTTON_TYPE.MAT_ICON_BUTTON,
				icon: 'delete',
				handler: () => {
					this.onDeleteHanlder(record.id);
				}
			})
		];
		return userModel;
	}

	openUserDialog(data?: UserModel) {
		let dialogModelData = {
			title: data ? 'Edit User' : 'Add User',
			component: UserCreateComponent,
			width: '700px'
		}
		if (data) {
			dialogModelData['componentData'] = data;
		}
		this.dialogService.openDialog(dialogModelData);
	}

	onDeleteHanlder(rowId: string) {
		this.dialogService.openDialog({
			title: 'Delete',
			message: 'Are you sure, you want to delete the record?',
			actions: [
				{
					type: BUTTON_TYPE.MAT_RAISED_BUTTON,
					label: 'Ok',
					handler: () => {
						this.deleteUser(rowId);
					},
					color: 'primary'
				},
				{
					type: BUTTON_TYPE.MAT_RAISED_BUTTON,
					label: 'Cancel',
					handler: () => {
						this.dialogService.closeDialog();
					},
					color: 'basic'
				}
			]
		});
	}

	deleteUser(rowId: string) {
		this.userService.delete(rowId).subscribe(
			res => {
				if (res['statusCode'] === 200) {
					this.tableData = this.tableData.filter(record => {
						return record['id'].toString() !== rowId;
					});
					this.dialogService.closeDialog();
					this.showSnackbar(res);
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	showSnackbar(res: Object) {
		this.snackbarService.show({
			message: res['message'],
			action: {
				title: 'Ok',
				handler: () => {
					console.log('closed');
				}
			}
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
