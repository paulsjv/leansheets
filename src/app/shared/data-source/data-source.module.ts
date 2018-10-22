import { NgModule } from '@angular/core';
import { DataSourceService } from './data-source.service';

@NgModule({
    exports: [DataSourceService]
})
export class DataSourceModule {};
