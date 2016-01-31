import hasOwnProp from 'www/js/utils/hasOwnProp';
import isEmpty from 'www/js/utils/isEmpty';
import isArray from 'www/js/utils/isArray';

/**
* @private variables for the file
*/
var queryConfig, log;

/**
* Checks to make sure that the property requested is in the query config.
* @private
* @param {string} the property to check
* @throws {Error} if the property does not exsist or if the property's value is empty
* @return {string|array} depeding on the property it could return a string or array
*/
var getQueryConfigProperty = (property) => {
        if (!hasOwnProp(queryConfig, property)) {
            throw new Error('GoogleQueryBuilderHelper - Query Config does not have property: ' + property);
        } 
        if (isEmpty(queryConfig[property])) {
            throw new Error('GoogleQueryBuilderHelper - Query Config property "'+ property +'" is empty!');
        }
        return queryConfig[property];
    };

/**
* Takes an array and makes it into a comma separated string.
* @private
* @param {array} the array must be array of strings
* @throws {Error} if the array is not all strings will throw error.
* @returns {string} comma separated string.
*/
var arrayToFields = (array) => {
        let string = '';
        for (let i=0; i<array.length; i++) {
            if (typeof(array[i]) === 'string') {
                string += array[i] + ','; 
            } else {
                throw new Error('GoogleQueryBuilderHelper - Query Config only supports strings in arrays');
            } 
        }
        return string;
    };

/**
* Builds the select fields that are to be returned by the query.
* @private
* @return {string}
*/
var buildSelectFields = () => {
        let fields = '';
        for (let key in queryConfig) {
            if (hasOwnProp(queryConfig, key)) {
                let field = getQueryConfigProperty(key);
                if (isArray(field)) {
                    fields += arrayToFields(field);
                } else {
                    fields += field + ',';
                }
            }
        }
        return fields.substring(0, fields.length - 1);
    };

/**
* Builds the SELECT clause of the sql statement.
* @private
* @returns {string}
*/
var buildSelectClause = () => {
        return 'SELECT ' + buildSelectFields();
    };

/**
* Builds the WHERE clause of the sql statement.
* @private
* @param {string} start date
* @param {string} end date
* @returns {string}
*/
var buildWhereClause = (startDate, endDate) => {
        let arrivalState = getQueryConfigProperty('states')[0]; 
        let where = 'WHERE '+ arrivalState +' is not null';

        if (isEmpty(startDate) || isEmpty(endDate)) {
            return where; 
        }
        return where + " AND toDate("+ arrivalState +") >= toDate(date '"+ startDate +"') AND toDate("+ arrivalState +") <= toDate(date '"+ endDate +"') order by D asc"; 
    };
 
/**
* GoogleQueryBuilder builds the query string that is used to get the data from Google Sheets.
*/
export default class GoogleQueryBuilder {

    /**
    * Constructor for GoogleQueryBuilder
    * @public
    * @param {object} the logger
    * @param {object} the query configuration 
    */
    constructor($log, qConfig) {
        $log.debug('GoogleQueryBuilder - in constructor');
        log = $log;
        queryConfig = qConfig;
    }

    /**
    * Builds the query that is needed by google sheets. 
    * @public
    * @param {date} - start date of first state of work that is in sheet
    * @param {date} - end date of the first state of work that is in sheet
    * @returns {string} - the query that is to be used to get the data
    */
    getQuery(startDate, endDate) {
        log.debug('GoogleQueryBuilder - startDate: ', startDate);
        log.debug('GoogleQueryBuilder - endDate: ', endDate);
        return buildSelectClause() + ' ' + buildWhereClause(startDate, endDate);
    }

}


