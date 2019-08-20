import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-status-chip',
	templateUrl: './status-chip.component.html',
	styleUrls: ['./status-chip.component.scss']
})
export class StatusChipComponent implements OnInit {

	@Input() status: string;
	@Input() size: string = 'small';

	constructor() { }

	ngOnInit() {
	}

	getClassName() {
		return this.status.toLowerCase().replace(/\s/g, "-") +' '+ this.size;
	}

}
