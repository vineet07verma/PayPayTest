import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'pay-lib';

import { UserModel } from './../../../models/user.model';
import { SidenavService } from './../../sidenav/sidenav.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

	authUserDetails: UserModel;

	constructor(
		private authenticationService: AuthenticationService,
		private router: Router,
		private sidenavService: SidenavService
	) { }

	ngOnInit() {
		this.authUserDetails = this.authenticationService.getAuthUser();
	}

	logout() {
		this.authenticationService.deleteAuthDetails();
		this.router.navigateByUrl('/');
		this.sidenavService.close();
	}

}
