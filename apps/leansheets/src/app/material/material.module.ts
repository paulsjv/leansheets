import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
} from '@angular/material';

@NgModule({
    imports: [
	MatButtonModule, 
	MatIconModule,
	MatFormFieldModule,
	MatInputModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule],
    exports: [
	MatButtonModule, 
	MatIconModule,
	MatFormFieldModule,
	MatInputModule,
    	MatSidenavModule,
        MatToolbarModule,
        MatListModule]
})
export class MaterialModule {}

