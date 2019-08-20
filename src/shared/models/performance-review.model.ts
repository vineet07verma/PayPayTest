export class PerformanceReviewModel {
	id: number = null;
	title: string;
	primary_goal: string;
	secondary_goal: string;
	employee_id: number;
	reviewer: string;
	complete_date: Date = new Date();
	feedback?: string = '';
	status?: string = 'Pending';

	constructor(obj: Object) {
		Object.assign(this, obj);
	}

	get formated_complete_date() {
        return new Date(this.complete_date);
	}
	
	get exercpt_primary_goal() {
		return this.primary_goal.substring(0, 15) + '...';
	}

	get exercpt_secondary_goal() {
		return this.secondary_goal.substring(0, 15) + '...';
	}
}