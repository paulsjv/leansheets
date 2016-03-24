import isDate from 'www/js/utils/isDate';
import isEmpty from 'www/js/utils/isEmpty';

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
    throw new Error('GoogleDataExtract.setQuery - dataUrl was null - please set to Google Sheet that holds the data');
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
    log.debug('googleDataExtract.js - in setDataOnPromise()');
    if (isResponseError(response)) {
        log.debug('googleDataExtract.js - Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        reject('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return undefined;
    }
    let dataTable = response.getDataTable();
    let json = JSON.parse(dataTable.toJSON());
    resolve(json);
    return json;
};

/**
 * This function tests the start and end dates for a query and will throw an error
 * if either date is not valid.
 * @private
 * @param {string} start date as string
 * @param {string} end date as string
 * @throws {Error} if the dates are not valid
 */
var areDatesValid = (startDate, endDate) => {
    if (isEmpty(startDate) || isEmpty(endDate)) {
        return;
    }
    if (!isDate(startDate, dateFormat) || !isDate(endDate, dateFormat)) {
        log.error('googleDataExtract.js - start date: ' + startDate + ' or end date: ' + endDate + ' is not valid');
        throw new Error('GoogleQueryBuilder - start date: "' + startDate + '" and/or end date: "' + endDate + '" was not a valid date!');
    }
};

/**
 * GoogleDataExtract is used to access Google Spreadsheet to pull rows.
 */
export default class GoogleDataExtract {

    /**
     * Constructor for the GoogleDataExtract
     * @param {object} $log - logger
     * @param {object} dsConfig - other options to set for service
     * @param {object} qBuilder - instance of GoogleQueryBuilder
     * @param {object} $google - Google's jsapi
     */
    constructor($log, dsConfig, qBuilder, $google) {
        $log.debug('googleDataExtract.js - in constructor!');
        log = $log;
        google = $google;
        dataUrl = dsConfig.dataUrl;
        queryBuilder = qBuilder;
        dateFormat = dsConfig.dateFormat;
    }

    /**
     * Calls Google Sheets over the wire to get a data set. If start and end dates are
     * are passed in then the query will bound the returned data set to those dates.
     * If no dates are passed in the query will return the entire data set in the Google
     * Sheet.
     * @public
     * @param {date} - (optional) start date of first state of work that is in sheet
     * @param {date} - (optional) end date of the first state of work that is in sheet
     * @returns {promise} - a CSV of sheet data
     */
    getData(startDate, endDate) {
        log.debug('googleDataExtract.js - getData()');

        areDatesValid(startDate, endDate);

        let dataQuery = queryBuilder.getQuery(startDate, endDate);

        log.debug('googleDataExtract.js - Query for data');
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
