/**
* GoogleDataService is used to access Google Spreadsheet to pull rows.
*/
export default class GoogleDataService {

    /**
    * $inject() fuction that AngularJS uses for it's dependency injection
    * @return {array} - array or objects that class needs
    */
    static get $inject() {
        return ['$log','$q','configService','$google'];
    }

    /**
    * Constructor for the GoogleDataService
    * @param {object} $log - logger
    * @param {object} $google - Google's jsapi
    * @param {object} configService - gets configuration settings
    */
    constructor($log, $q, dsConfig, $google) {
        $log.debug('googleDataService.js - in constructor!');
        this.log = $log;
        this.google = $google;
        this.q = $q;
        this.dataUrl = dsConfig.dataUrl; 
    }

    /**
    * Calls Google Sheets over the wire to get a data set.
    * @public
    * @param {date} - start date of first state of work that is in sheet
    * @param {date} - end date of the first state of work that is in sheet
    * @returns {promise} - a CSV of sheet data
    */
    getData(startDate, endDate) {
        this.log.debug('googleDataService.js - getData()');
        let that = this;
        var deferred = this.q.defer(),
            promise = deferred.promise,
            dataQuery = "select * where D is not null AND toDate(D) >= toDate(date '"+startDate+"') AND toDate(D) <= toDate(date '"+endDate+"') order by D asc",
            handleResponse = function(response) {
                that.log.debug('handleResponse from Google:');
                that.log.debug(response);
                that.setDataOnPromise(response, deferred);
            },
            query;

        this.log.debug('googleDataService.js - Query for data');
        this.log.debug(dataQuery);
        this.log.debug('*************** Calling Google Over the Wire ***************');
        query = this.setQuery(); 
        query.setQuery(dataQuery);
        query.send(handleResponse);
        return promise;

    }

    /** 
    * Creates the query object for calling Google over the wire.
    * @private
    * @returns {object} - the Google Query object
    * @throws {Error} - if this.dataUrl is not set should through Error
    */
    setQuery() {
        this.log.debug('googleDataService.js - in setQuery()');
        if (this.dataUrl !== null) { 
            return new this.google.visualization.Query(this.dataUrl);
        }
        this.log.error('googleDataService.setQuery - this.dataUrl was null - please set to Google Sheet that holds the data');
        throw new Error('googleDataService.setQuery - this.dataUrl was null - please set to Google Sheet that holds the data');
    }

    /**
    * Sets the CSV data on the promise that was returned in the getData() call.
    * @private
    * @param {object} - the response object from the Google call
    * @param {object} - the deferred object from the getData() method
    * @returns {string} - the CSV data from the response
    */
    setDataOnPromise(response, deferred) {
        if (this.isResponseError(response)) {
                this.log.error('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                deferred.reject('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                return undefined;
        }
        let dataTable = response.getDataTable();
        this.log.debug('dataTable toJSON:');
        let json = dataTable.toJSON();
        this.log.debug(json);
        deferred.resolve(json);
        return json;
	}

    /**
    * Checks to see if the response from Google errored out.
    * @private
    * @param {object} - the response object from the Google call
    * @returns {boolean} - true if the response is in error, false otherwise
    */
    isResponseError(response) {
        if (response.isError()) {
            return true;
        }
        return false;
    }

    /**
    * Creates a object of the properties of the class.  Used mainly for testing.
    * @returns {object}
    */ 
    toString() {
        return { "this.dataUrl": this.dataUrl }; 
    }
}
