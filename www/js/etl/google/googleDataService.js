import isDate from 'www/js/utils/isDate';

/**
* @private variables for the file
*/
var log, google, queryBuilder, dataUrl, dateFormat;

/** 
* Creates the query object for calling Google over the wire.
* @private
* @returns {object} - the Google Query object
* @throws {Error} - if dataUrl is not set should through Error
*/
var setQuery = () => {
        if (dataUrl !== null) { 
            return new google.visualization.Query(dataUrl);
        }
        throw new Error('googleDataService.setQuery - dataUrl was null - please set to Google Sheet that holds the data');
    };

/**
* Checks to see if the response from Google errored out.
* @private
* @param {object} - the response object from the Google call
* @returns {boolean} - true if the response is in error, false otherwise
*/
var isResponseError = (response) => {
        if (response.isError()) {
            return true;
        }
        return false;
    };

/**
* Sets the CSV data on the promise that was returned in the getData() call.
* @private
* @param {object} - the response object from the Google call
* @param {object} - the resolve object if call is successful from the getData()
* @param {object} - the reject object if call is unsuccessful from the getData()
* @returns {string} - the CSV data from the response
*/
var setDataOnPromise = (response, resolve, reject) => {
        log.debug('googleDataService.js - in setDataOnPromise()');
        if (isResponseError(response)) {
                log.debug('googleDataService.js - Error in query: '+ response.getMessage() +' '+ response.getDetailedMessage());
                reject('Error in query: '+ response.getMessage() +' '+ response.getDetailedMessage());
                return undefined;
        }
        let dataTable = response.getDataTable();
        let json = dataTable.toJSON();
        resolve(json);
        return json;
	};

var areDatesValid = (startDate, endDate) => {
    if (!isDate(startDate, dateFormat) || !isDate(endDate, dateFormat)) {
        log.error('googleDataService.js - start date: '+ startDate +' or end date: '+ endDate +' is not valid');
        throw new Error('GoogleQueryBuilder - start date: "'+ startDate + '" and/or end date: "'+ endDate +'" was not a valid date!');
    }
};

/**
* GoogleDataService is used to access Google Spreadsheet to pull rows.
*/
export default class GoogleDataService {

    /**
    * Constructor for the GoogleDataService
    * @param {object} $log - logger
    * @param {object} dsConfig - other options to set for service
    * @param {object} qBuilder - instance of GoogleQueryBuilder
    * @param {object} $google - Google's jsapi
    */
    constructor($log, dsConfig, qBuilder, $google) {
        $log.debug('googleDataService.js - in constructor!');
        log = $log;
        google = $google;
        dataUrl = dsConfig.dataUrl; 
        queryBuilder = qBuilder;
        dateFormat = dsConfig.dateFormat;
    }

    /**
    * Calls Google Sheets over the wire to get a data set.
    * @public
    * @param {date} - start date of first state of work that is in sheet
    * @param {date} - end date of the first state of work that is in sheet
    * @returns {promise} - a CSV of sheet data
    */
    getData(startDate, endDate) {
        log.debug('googleDataService.js - getData()');

        areDatesValid(startDate, endDate);

        let dataQuery = queryBuilder.getQuery(startDate, endDate);

        log.debug('googleDataService.js - Query for data');
        log.debug(dataQuery);
        log.debug('*************** Calling Google Over the Wire ***************');
        
        let promise = new Promise((resolve, reject) => {
            try {
                let query = setQuery(); 
                query.setQuery(dataQuery);
                query.send((response) => {
                    log.debug('HandleResponse from Google:');
                    log.debug(response);
                    setDataOnPromise(response, resolve, reject);
               });
            } catch (err) {
                reject(err.message);
            }
        });
         
       return promise;

    }
}
