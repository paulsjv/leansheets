/**
* GoogleDataService is used to access Google Spreadsheet to pull rows.
*/
export default class GoogleDataService {

    /**
    * $inject() fuction that AngularJS uses for it's dependency injection
    * @return {array} - array or objects that class needs
    */
    static get $inject() {
        return ['$log','CONFIG','$google','$q'];
    }

    /**
    * Constructor for the GoogleDataService
    * @param {object} $log - logger
    * @param {object} CONFIG - application configuration
    * @param {object} $google - Google's jsapi
    */
    constructor($log, CONFIG, $google, $q) {
        $log.debug('googleDataService.js - in constructor!');
        this.log = $log;
        this.config = CONFIG;
        this.google = $google;
        this.q = $q;
        this.dataUrl = null;
    }

    /**
    * Bootstraps the service with values from the application configuration.
    * @public
    * @param {string} dataSourceKey - the key from the dataSources object in the configuration
    */
    bootstrapInstance(dataSourceKey) {
        this.log.debug('googleDataService.js - in bootstrapInstance()');
        if (!this.isConfigValid(dataSourceKey)) {
            throw new Error('GoogleDataService bootstrap error with configuration');
        }
        this.dataUrl = this.config.dataSources[dataSourceKey].data;    
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
        let csvData = this.google.visualization.dataTableToCsv(dataTable);
        deferred.resolve(csvData);
        return csvData;
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
    * Validates that the requested data source is in the application configuration.
    * @private
    * @returns {boolean}
    */
    isConfigValid(dataSourceKey) {
        return (this.config.dataSources.hasOwnProperty(dataSourceKey) && this.config.dataSources[dataSourceKey].hasOwnProperty('data'));
    }

    /**
    * Creates a object of the properties of the class.  Used mainly for testing.
    * @returns {object}
    */ 
    toString() {
        return { "data": this.dataUrl }; 
    }
}
