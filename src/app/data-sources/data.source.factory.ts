import { AppInjector } from '../services/app-injector';
import { Injectable, InjectionToken } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { DataSource } from './data.source';

@Injectable()
export class DataSourceFactory {
  constructor(private configService: ConfigService) {};

  getDataSource(): DataSource {
      let type = new InjectionToken<DataSource>(this.configService.getDataSourceDriver());
      return AppInjector.get<DataSource>(type);
  }

}
