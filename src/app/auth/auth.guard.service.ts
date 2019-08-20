import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Resolve } from '@angular/router';

import { AuthenticationService } from 'pay-lib';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad, Resolve<any> {

	constructor(
		private authenticationService: AuthenticationService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) { }

	resolve(
        route: ActivatedRouteSnapshot
    ) {
		if( this.authenticationService.isLoggedIn ) {
			this.router.navigate(['/reviews']);
			return true;
		} 
		return false;
    }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;
		if(this.checkLogin(url)) {
			if( !this.isAllowed(url) ) {
				this.router.navigate(['/reviews']);
				return false;
			}
		} else {
			this.router.navigate(['/']);
			return false;
		}
		return true;
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;
		if(this.checkLogin(url)) {
			if( !this.isAllowed(url) ) {
				this.router.navigate(['/reviews']);
				return false;
			}
		} else {
			this.router.navigate(['/']);
			return false;
		}
		return true;
	}

	canLoad(route: Route): boolean {
		let url = `/${route.path}`;
		if(this.checkLogin(url)) {
			if( !this.isAllowed(url) ) {
				this.router.navigate(['/reviews']);
				return false;
			}
		} else {
			this.router.navigate(['/']);
			return false;
		}
		return true;
	}

	checkLogin(url?: string): boolean {
		if (this.authenticationService.isLoggedIn) { return true; }
		return false;
	}

	isAllowed(url: string): boolean {
		// for RBAC to implement
		return true;
	}
}
