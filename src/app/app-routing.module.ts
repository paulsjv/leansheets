import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { WipComponent } from './containers/wip/wip.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

const appRoutes: Routes = [ 
  { path: 'wip', component: WipComponent },
  { path: '', component: DashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
