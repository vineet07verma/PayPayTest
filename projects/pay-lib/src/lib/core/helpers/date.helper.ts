import { DatePipe } from '@angular/common';

import { LIB_CONFIG } from '../config/lib.config';

export class DateHelper {	
	public static formatDate(date: string, format: string) {
		return new DatePipe(LIB_CONFIG.locale).transform(new Date(date), format);
	}

	//d1: 02/14/2019
	public static daysDiff(d1: string, d2: string) {
		return Math.floor(( Date.parse(d2) - Date.parse(d1) ) / 86400000);
	}

	public static date_diff_indays(date1, date2) {
		let dt1 = new Date(date1);
		let dt2 = new Date(date2);
		return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
	}
}