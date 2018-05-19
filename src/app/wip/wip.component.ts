import { Component, OnInit } from '@angular/core';

import * as cf from 'crossfilter2';
import { Status } from '../status';
import { DataSourceFactory } from '../data-sources/data.source.factory';
import { DataSource } from '../data-sources/data.source';

@Component({
  selector: 'app-wip',
  templateUrl: './wip.component.html',
  styleUrls: ['./wip.component.css']
})
export class WipComponent implements OnInit {

  constructor(private dataSourceFactory: DataSourceFactory) { }

  ngOnInit() {
      this.dataSource = this.dataSourceFactory.getDataSource();
  }

//  data = cf(this.getHistory());
  dataSource: DataSource;
  issues: Array<any>;

  getWorkItems() {
    this.issues = this.dataSource.getWorkItems();
  }
  /**
   *
   * @returns {Array<Status>}
   *
  getHistory(): Array<Status> {
        let cl = this.getChangelog();
        // get first status which is the created date and fromStatus == "" and toStatus == "To Do" or first workflow step

        let statuses = new Array<Status>();
        statuses.push(new Status(new Date(cl.fields.created), "", "To Do"));

        for (let history of cl.changelog.histories) {
            for (let item of history.items) {
                if (item.field === "status") {
                    statuses.push(new Status(new Date(history.created), item.fromString, item.toString));
                }
            }
        }

        return statuses;

  }*/

}
