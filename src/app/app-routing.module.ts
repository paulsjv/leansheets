import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { WipComponent } from './containers/wip/wip.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
//import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { DataSourceComponent } from './containers/data-source/data-source.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [ 
  { path: 'wip', component: WipComponent, canActivate: [ AuthGuard ] },
  { path: '', component: DashboardComponent },
//  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'datasource', component: DataSourceComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes) ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
