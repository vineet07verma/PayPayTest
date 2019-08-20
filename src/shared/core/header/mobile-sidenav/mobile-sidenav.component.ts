import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'pay-lib';

@Component({
	selector: 'app-mobile-sidenav',
	templateUrl: './mobile-sidenav.component.html',
	styleUrls: ['./mobile-sidenav.component.scss']
})
export class MobileSidenavComponent implements OnInit {

	isLoggedIn: boolean = false;

	constructor(
		private authenticationService: AuthenticationService
	) { }

	ngOnInit() {
		this.isLoggedIn = this.authenticationService.isLoggedIn;
	}

}
