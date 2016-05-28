import { _find, _findIndex } from 'www/js/utils/find';
import hasOwnProp from 'www/js/utils/hasOwnProp';
import isArray from 'www/js/utils/isArray';
import isEmpty from 'www/js/utils/isEmpty';

/**
* Private variables for the file.
* log - logger for the file.
* queryConfig - the config from the applicaiton configuration.
* googleIndexes - the index of the position in the array for each column 
*   of the Google Spreadsheet that is from the application configuration.
*/
var log, queryConfig, googleIndexes;

/**
* addToRow - this function takes a Google Sheet cell and populates the 
*   mapped row.
* @private
* @param {object} cell - the Google Sheet cell.
* @param {integer} to - the index position to put the value of the cell into the row.
* @param {array} row - the new row that the cell value is put into.
*/
var addToRow = (cell, to, row) => {
    if (isEmpty(cell)) {
        row[to] = null;
    } 
    if (hasOwnProp(cell, "f")) {
        row[to] = cell.f;
        return;
    } 
    if (hasOwnProp(cell, "v")) {
        row[to] = cell.v;
        return;
    }
};

/**
* createRows - this function transforms each Google Shee row into an array of vaules.
* @private
* @param {object} rows - Google Sheets row object an array of cell objects as JSON.
* @param {object} map - object|array of integers for positions to put values to.
* @returns {array} - an array of the Google Sheet row.
*/
var createRows = (rows, map) => {
    log.debug('googleDataTransform.js - in createRows()');
    let data = [];
    for (let j=0;j<rows.length;j++) {
        let row = rows[j], newRow = [];
        for (let property in googleIndexes) {
            if (hasOwnProp(googleIndexes, property)) {
                let from = googleIndexes[property];
                let to = map[property];
                if (isArray(from) && isArray(to)) {
                    for (let i=0;i<from.length;i++) {
                        let cell = row.c[from[i]];
                        addToRow(cell, to[i], newRow);
                    }
                } else {
                    let cell = row.c[from];
                    addToRow(cell, to, newRow);
               }
            }
        }
        data.push(newRow); 
    }
    return data;
};

/**
* addProperty - adds a property to the meta data headers and integer to the map.
* @private
* @param {object} cols - column headers from Google Sheets as JSON.
* @param {string} property - the property to be added.
* @param {object} meta - returned object with a headers and map properties.
* @param {integer} counter - keeps track of what index to put in the map.
* @returns {integer} - returns the counter so that it can be incramented.
*/
var addProperty = (cols, property, meta, counter) => {
    log.debug('googleDataTransform.js - in addProperty()'+property);
    if (hasOwnProp(queryConfig, property)) {
        if (isArray(queryConfig[property])) {
            meta.map[property] = [];
            meta.headers[property] = [];
            googleIndexes[property] = [];
            for (let i=0;i<queryConfig[property].length;i++) {
                let obj = _find(cols, [ "id", queryConfig[property][i] ]);
                googleIndexes[property][i] = _findIndex(cols, [ "id", queryConfig[property][i] ]); 
                meta.map[property][i] = counter;
                meta.headers[property][i] = obj.label;
                counter++; 
            }
        } else {
            let obj = _find(cols, [ "id", queryConfig[property] ]);
            googleIndexes[property] = _findIndex(cols, [ "id", queryConfig[property] ]);
            meta.map[property] = counter;
            meta.headers[property] = obj.label; 
            counter++;
        }
        return counter;
    }
};

/**
* createMeta - function that creates the meta headers and map.
* @private
* @param {object} cols - Google Sheets colums JSON.
* @returns {object} - the meta.headers and the meta.map.
*/
var createMeta = (cols) => {
    log.debug('googleDataTransform.js - createMeta()');
    let indexCounter = 0, returnObj = { map: {}, headers: {} };
    for (let property in queryConfig) {
        if (hasOwnProp(queryConfig, property)) {
            indexCounter = addProperty(cols, property, returnObj, indexCounter);
        }
    }
    return returnObj;
};

var toString = (transformed) => {

};

/**
* GoogleDataTransform takes the JSON data from Google Sheets and transforms it so 
* LeanSheets can use the data. 
* @class
*/
export default class GoogleDataTransform {

    /**
    * Constructor for GooleDataTransform
    * @public
    * @constructor
    * @param {object} $log - application logger.
    * @param {object} qConfig - application query configuration.
    */ 
    constructor($log, dsConfig) {
        $log.debug('googleDataTransform - in constructor()!');
        log = $log;
        queryConfig = dsConfig.queryConfig;
        googleIndexes = {};
    } 

    /**
    * transformData - transforms Google Sheet JSON data to LeanSheets.
    * @public
    * @param {object} data - Google Sheets JSON data.
    * @returns {object} - transformed data:
    *   <pre><code>
    *   { meta: { headers: { // same as queryConfig in app configuration //}, map { // same as queryConfig in app configuration // } }, data: [[row1],[row2],[etc]] }
    *   </code></pre>
    */
    transformData(data) {
        log.debug('googleDataTransform.js - transformData()');
        let metaData = createMeta(data.cols);
        let dataRows = createRows(data.rows, metaData.map);
        let transformed = {
            meta: metaData,
            data: dataRows 
        };
        googleIndexes = {};
        data = null;
        return transformed;
    }

}