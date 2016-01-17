export default class GoogleQueryBuilder {

    constructor($log, queryConfig) {
        this.log = $log;
        this.queryConfig = queryConfig;
    }

    getQuery(startDate, endDate) {
        return this.buildSelectClause() + ' ' + this.buildWhereClause(startDate, endDate);
    }

    isEmpty(data) {
        if (typeof(data) === 'undefined' || data === null) {
            return true;
        }
        if (typeof(data) !== 'undefined') {
            return data.length === 0;
        }
        return true;
    }

    hasProperty(property) {
        if (this.queryConfig.hasOwnProperty(property)) {
            return true;
        }
        return false;
    }

    getQueryConfigProperty(property) {
        if (!this.hasProperty(property)) {
            return null;
        } 
        if (!this.isEmpty(this.queryConfig[property])) {
            return this.queryConfig[property];
        }
        return null;
    }


    buildSelectClause() {
        return 'SELECT ' + this.buildSelectFields();
         
    }

    arrayToFields(array) {
        if (!Array.isArray(array)) {
            throw new Error('googleQueryBuilder.js - array was not passed to method');
        }
        let string = '';
        for (let i=0; i<array.length; i++) {
            if (typeof(array[i]) === 'string') {
                string += array[i] + ','; 
            } else {
                throw new Error('googleQueryBuilder.js - queryConfig only supports strings in arrays');
            } 
        }
        return string;
    }

    buildSelectFields() {
        let fields = '';
        for (let key in this.queryConfig) {
            if (this.queryConfig.hasOwnProperty(key)) {
                let field = this.getQueryConfigProperty(key);
                if (field !== null) {
                    if (Array.isArray(field)) {
                        fields += this.arrayToFields(field);
                    } else {
                        fields += field + ',';
                    }
                }
            }
        }
        return fields.substring(0, fields.length - 1);
    }

    buildWhereClause(startDate, endDate) {
        let arrivalState = this.getQueryConfigProperty('states')[0]; 
        return "WHERE "+ arrivalState +" is not null AND toDate("+ arrivalState +") >= toDate(date '"+ startDate +"') AND toDate("+ arrivalState +") <= toDate(date '"+ endDate +"') order by D asc"; 
    }
    
}
