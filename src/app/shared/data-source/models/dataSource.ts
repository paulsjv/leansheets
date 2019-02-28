/**
* A data source should be simply the information to be able to connect
* to a data source.
*/
export interface DataSource {
	id: string;
	connection: string;
	password: string;
	protocol: string;
	type: string;
	username: string;
}
