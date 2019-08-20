import { Component, OnInit, ViewEncapsulation, ViewChild, AfterContentChecked } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService } from 'pay-lib';

import { SidenavService } from '../sidenav/sidenav.service';
import { SidenavModel } from '../sidenav/sidenav.model';
import { MobileSidenavComponent } from './mobile-sidenav/mobile-sidenav.component';
import { NavComponent } from './nav/nav.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
	isShowHammBurgerMenu: boolean = true;
	@ViewChild(NavComponent, { static: true }) navComponent: NavComponent;
	isLoggedIn: boolean = false;

	constructor(
		private sidenavService: SidenavService,
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	ngOnInit() {
		this.router.events.subscribe((event) => {
			if (event instanceof (NavigationEnd)) {
				this.isLoggedIn = this.authenticationService.isLoggedIn;
			}
		});
	}

	toggleSideNav() {
		this.sidenavService.injectComponent(new SidenavModel({
			component: MobileSidenavComponent,
			position: 'end'
		}));
		this.sidenavService.toggle();
	}

}
