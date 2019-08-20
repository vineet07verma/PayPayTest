import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from 'pay-lib';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	isLoggedIn: boolean = false;

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	ngOnInit() {
		this.isLoggedIn = this.authenticationService.isLoggedIn;
		this.router.events.subscribe((event) => {
			if(event instanceof(NavigationEnd)) {
				this.isLoggedIn = this.authenticationService.isLoggedIn;
			}
		});
	}

}
