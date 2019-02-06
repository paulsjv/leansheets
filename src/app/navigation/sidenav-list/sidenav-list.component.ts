import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubscription: Subscription;

  @Output() closeSidenav = new EventEmitter<void>();

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
	this.onClose();
	this.authService.logout();
  }

  onClose() {
	this.closeSidenav.emit();
  }
}
