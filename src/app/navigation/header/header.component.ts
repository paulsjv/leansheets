import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubscription: Subscription;

  @Output() sidenavToggle = new EventEmitter<void>();
	
  constructor(private authService: AuthService) { }

  ngOnInit() {
	  this.authSubscription = this.authService.authChange.subscribe(authStatus => {
	 	this.isAuth = authStatus;
	  });
  }

  ngOnDestroy() {
	this.authSubscription.unsubscribe();
  }

  onLogout() {
	this.authService.logout();
  }

  onToggleSidenav() {
	this.sidenavToggle.emit();
  }

}
