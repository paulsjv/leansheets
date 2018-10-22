import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { WipComponent } from './containers/wip/wip.component';

const appRoutes: Routes = [ 
	{ path: 'wip', component: WipComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
