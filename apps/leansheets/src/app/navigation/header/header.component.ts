import { Component, EventEmitter, Output } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent { 

  @Output() sidenavToggle = new EventEmitter<void>();
	
  constructor(public auth: AuthService) { }

  onToggleSidenav() {
	this.sidenavToggle.emit();
  }

}
