import hasOwnProp from 'www/js/utils/hasOwnProp';
import isEmpty from 'www/js/utils/isEmpty';
import isArray from 'www/js/utils/isArray';

var getQueryConfigProperty = (queryConfig, property) => {
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

var buildSelectFields = (queryConfig) => {
        let fields = '';
        for (let key in queryConfig) {
            if (hasOwnProp(queryConfig, key)) {
                let field = getQueryConfigProperty(queryConfig, key);
                if (isArray(field)) {
                    fields += arrayToFields(field);
                } else {
                    fields += field + ',';
                }
            }
        }
        return fields.substring(0, fields.length - 1);
    };

export function buildSelectClause (queryConfig) {
        return 'SELECT ' + buildSelectFields(queryConfig);
    }

export function buildWhereClause (queryConfig, startDate, endDate) {
        let arrivalState = getQueryConfigProperty(queryConfig, 'states')[0]; 
        return "WHERE "+ arrivalState +" is not null AND toDate("+ arrivalState +") >= toDate(date '"+ startDate +"') AND toDate("+ arrivalState +") <= toDate(date '"+ endDate +"') order by D asc"; 
    }
 
