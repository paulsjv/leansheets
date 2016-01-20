import hasOwnProp from 'www/js/utils/hasOwnProp';
import isEmpty from 'www/js/utils/isEmpty';
import isArray from 'www/js/utils/isArray';

var queryConfig, log;

var getQueryConfigProperty = (property) => {
        if (!hasOwnProp(queryConfig, property)) {
            throw new Error('GoogleQueryBuilderHelper - Query Config does not have property: ' + property);
        } 
        if (isEmpty(queryConfig[property])) {
            throw new Error('GoogleQueryBuilderHelper - Query Config property "'+ property +'" is empty!');
        }
        return queryConfig[property];
    };

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

var buildSelectClause = () => {
        return 'SELECT ' + buildSelectFields();
    };

var buildWhereClause = (startDate, endDate) => {
        let arrivalState = getQueryConfigProperty('states')[0]; 
        return "WHERE "+ arrivalState +" is not null AND toDate("+ arrivalState +") >= toDate(date '"+ startDate +"') AND toDate("+ arrivalState +") <= toDate(date '"+ endDate +"') order by D asc"; 
    };
 

export default class GoogleQueryBuilder {

    constructor($log, qConfig) {
        $log.debug('GoogleQueryBuilder - in constructor');
        log = $log;
        queryConfig = qConfig;
    }

    getQuery(startDate, endDate) {
        log.debug('GoogleQueryBuilder - startDate: ', startDate);
        log.debug('GoogleQueryBuilder - endDate: ', endDate);
        return buildSelectClause() + ' ' + buildWhereClause(startDate, endDate);
    }

}


