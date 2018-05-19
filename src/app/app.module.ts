import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { setAppInjector } from './services/app-injector';
import { AppComponent } from './app.component';
import { WipComponent } from './wip/wip.component';
import { Jira64014Service } from './data-sources/jira/v6.4/64014.service';
import { DataSourceFactory } from './data-sources/data.source.factory';
import { ConfigService } from './services/config.service';


@NgModule({
  declarations: [
    AppComponent,
    WipComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ConfigService,
    Jira64014Service,
    { provide: DataSourceFactory, useFactory: DataSourceFactory, deps: [ ConfigService ]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
