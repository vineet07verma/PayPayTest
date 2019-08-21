import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService } from 'pay-lib';

import { SidenavService } from './../../sidenav/sidenav.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
	isLoggedIn: boolean = false;
	role: string;
	constructor(
		private sidenavService: SidenavService,
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	ngOnInit() {
		this.isLoggedIn = this.authenticationService.isLoggedIn;
		this.role = this.authenticationService.getAuthUser().role;
	}

	closeSideNav() {
		this.sidenavService.close();
	}

}
