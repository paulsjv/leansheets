/**
* A data source should be simply the information to be able to connect
* to a data source.
*/
export interface DataSource {
	/**
	* @name getWorkItem
	* @summary Get a Work Item from a Data Source
	* @description Get the work item from a specific data source
	*
	* @param {String} id - the key for the item requesting
	* @return {WorkItem} - the work item requested
	* @throws {WorkItemNotFoundError} - work item must exist
	*/
//	getWorkItem(id: string): WorkItem;

	
//	getWorkItems(): WorkItem[];

	getProtocol(): string;
	getUrl(): string;
	getUsername(): string;
	getPassword(): string;
	getToken(): string;
}
