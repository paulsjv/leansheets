import { Component, EventEmitter, Output} from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent { 

  @Output() closeSidenav = new EventEmitter<void>();

  constructor(public auth: AuthService) { }

  onLogout() {
	this.onClose();
	this.auth.signOut();
  }

  onClose() {
	this.closeSidenav.emit();
  }
}
