import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [ LoginComponent ],
    imports: [
        CommonModule,
        FlexLayoutModule
    ],
    exports: [
        LoginComponent
    ]
})
export class AuthModule {}