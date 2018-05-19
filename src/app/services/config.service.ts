import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() { }

  getDataSourceDriver() {
    return "Jira64014Service";
  }

}
