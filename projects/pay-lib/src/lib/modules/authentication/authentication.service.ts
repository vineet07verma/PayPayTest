import { Injectable } from '@angular/core';

import { AuthToken, AuthUser } from './models/index';

@Injectable()
export class AuthenticationService {	

	private authToken: AuthToken = new AuthToken();
	private authUser: AuthUser = new AuthUser();

    constructor() {
		this.authToken.tokenName = 'token';
		this.authUser.userName = 'user';
	}

    get isLoggedIn(): boolean {
        return !!sessionStorage.getItem(this.authToken.tokenName);
    }

    getAuthToken() {
        this.authToken.token = sessionStorage.getItem(this.authToken.tokenName);
        return this.authToken.token;
    }

    getAuthUser() {
		this.authUser.user = sessionStorage.getItem(this.authUser.userName);
		if(this.authUser.user) {
			this.authUser.user = JSON.parse(this.authUser.user);
		}
		return this.authUser.user;
    }

    setAuthUser(user) {
		sessionStorage.setItem(this.authUser.userName, JSON.stringify(user));
    }

    get role() {
        return this.getAuthUser()['ROLE'];
    }

    get loginId() {
        return this.getAuthUser()['LOGIN_ID'];
    }

    setAuthDetails(token, user) {
        if( !token ) return;
        sessionStorage.clear();
        sessionStorage.setItem(this.authToken.tokenName, token);
        this.setAuthUser(user);
    }

    deleteAuthDetails() {
        sessionStorage.clear();
    }
}