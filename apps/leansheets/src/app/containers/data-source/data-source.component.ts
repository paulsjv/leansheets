import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { DataSource } from '../../shared/data-source/models/dataSource';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.css']
})
export class DataSourceComponent implements OnInit {
  
  private dataSources: Observable<DataSource[]>; 
  dataSourceTypes;

  constructor(private db:AngularFirestore) { }
  
  // should use the datasources ngrx store to get a list of all the
  // datasources to display for the user
  // build the datastore in ngrx after the user is authenicated
  // should create a datastore service for this component that 
  // gets all the drop down values etc for each form when adding a datasource
  ngOnInit() {
	this.dataSources = this.db.collection<DataSource>('dataSources')
	  .snapshotChanges()
	  .pipe(
	    map(docArray => {
	    	return docArray.map(doc => {
			const data = doc.payload.doc.data();
			const id = doc.payload.doc.id;
			return {
			  id,
			  ...data
			};
		});
 	    })
	  );
	  /*
	  .pipe(
	    map(docArray => {
	      return docArray.map(doc => {

	      });
	    })*/
//	  .subscribe(docArray => console.log(docArray));
  }

	addDataSource() {
		console.log("add data source");
	}
}
