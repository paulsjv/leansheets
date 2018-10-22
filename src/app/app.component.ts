import { Component } from '@angular/core';
/*
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RootObject } from './shared/data-source/jira/6.4/data-types'; 
import { DateService } from './shared/date/date.service';
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'leansheets';

  constructor() {}
/*
  getIssue() {
	console.log("in get issue");
	let obs = this.http.get<RootObject>('https://jira.carezen.local/rest/api/2/issue/HP-1113?expand=changelog', 
		{ headers: new HttpHeaders().set('Content-Type','application/json') });
	obs.subscribe( data => {
		console.log('GET RETURNED!');
		console.log(data);
		console.log(data.changelog.histories);

		console.log(data.fields.created);
		console.log(this.dateService.format(data.fields.created,'MM/dd/yyyy'));
		let created = new Date(data.fields.created);
		console.log(created);
		let histories = data.changelog.histories;
		for (let history of histories) {
			let prevItemCreatedDate = data.fields.created;
			for (let item of history.items) {
				if (item.field === "status") {
					console.log(prevItemCreatedDate);
					console.log(history.created);
					console.log(item.fromString);
					console.log(item.toString);
					console.log(this.dateService.differenceInCalendarDays(history.created,prevItemCreatedDate));
					prevItemCreatedDate = history.created;
				}
			}
		}
	});
 
  }
*/
}
