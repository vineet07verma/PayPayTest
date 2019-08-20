export class UserModel {
	id: number = null;
	first_name: string;
	last_name: string;
	email_id: string;
	employee_code: number;
	username: string;
	role: string;
	status?: boolean = true;
	
	constructor(obj: UserModel) {
		Object.assign(this, obj);
	}

	get statusType() {
		return this.status ? 'Active' : 'Deactive';
	}
}