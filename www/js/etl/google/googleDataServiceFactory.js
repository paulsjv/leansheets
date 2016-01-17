import GoogleDataService from 'www/js/etl/google/googleDataService';
import GoogleQueryBuilder from 'www/js/etl/google/googleQueryBuilder';

export default class GoogleDataServiceFactory {

    /**
    * $inject() fuction that AngularJS uses for it's dependency injection
    * @return {array} - array or objects that class needs
    */
    static get $injector() {
        return ['$log'];
    }

    /**
    * Constructor for the GoogleDataServiceFactory
    * @param {object} $log - logger
    * @param {object} $q - object for accessing defer and promise
    */
    constructor($log) {
        this.log = $log;
    }

     /**
    * Creates an instance of GoogleDataService and returns it.
    * @public
    * @param {object} - logger for class
    * @param {object} - q to return defers and promises
    * @param {object} - the configService object
    * @param {string} - the data source key
    */
    createInstance(log, configService, dataSourceKey) {
        log.debug('googleDataServiceFactory.js - in createInstance');
        let ds = configService.getDataSource(dataSourceKey);
        if (!ds.hasOwnProperty('data')) {
            log.error('googleDataServiceFactory.js - DataSource: ' + dataSourceKey + ' in the configuration is missing "data" property!');
            throw new Error('GoogleDataServiceFactory createInstance error: data property is missing!');
        }
        if (!ds.hasOwnProperty('queryConfig')) {
            log.error('googleDataServiceFactory.js - QueryConfig for data source "'+ dataSourceKey +'" is missing!');
            throw new Error('GoogleDataServiceFactory createInstance error: query configuration is missing!');
        }
        let queryBuilder = new GoogleQueryBuilder(log, ds.queryConfig);
        let dsConfig = { 
            dataUrl: ds.data 
        }; 
        return new GoogleDataService(log, dsConfig, queryBuilder, window.google);
    }
}
