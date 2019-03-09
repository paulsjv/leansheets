import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
// https://github.com/angular/angularfire2/issues/1993 - post 1/22/2019 
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DateModule } from './shared/date/date.module';
import { AppRoutingModule } from './app-routing.module';
import { WipComponent } from './containers/wip/wip.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { DataSourceComponent } from './containers/data-source/data-source.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    WipComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavListComponent,
    DataSourceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatMenuModule,
    MatExpansionModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    DateModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
