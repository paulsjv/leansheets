import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
	authChange = new Subject<boolean>();
	private user: User = null;

	constructor(private router: Router) {};

	registerUser(authData: AuthData) {
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random() * 10000).toString()
		};
		this.authChange.next(true);
		this.router.navigate(['/']);
	}

	login(authData: AuthData) {
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random() * 10000).toString()
		};
		this.authChange.next(true);
		this.router.navigate(['/']);
	}

	logout() {
		this.user = null;
		this.authChange.next(false);
		this.router.navigate(['/login']);
	}

	getUser(): User {
		return { ...this.user }
	}

	isAuth(): boolean {
		return this.user !== null;
	}

}
