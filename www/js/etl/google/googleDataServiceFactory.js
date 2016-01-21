import GoogleDataService from 'www/js/etl/google/googleDataService';
import GoogleQueryBuilder from 'www/js/etl/google/googleQueryBuilder';
import hasOwnProp from 'www/js/utils/hasOwnProp';

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
    */
    constructor($log) {
        this.log = $log;
    }

     /**
    * Creates an instance of GoogleDataService and returns it.
    * @public
    * @param {object} - logger for class
    * @param {object} - the configService object
    * @param {string} - the data source key
    */
    createInstance(log, configService, dataSourceKey) {
        log.debug('googleDataServiceFactory.js - in createInstance');
        let ds = configService.getDataSource(dataSourceKey);
        if (!hasOwnProp(ds, 'data')) {
            log.error('googleDataServiceFactory.js - DataSource: ' + dataSourceKey + ' in the configuration is missing "data" property!');
            throw new Error('GoogleDataServiceFactory createInstance error: data property is missing!');
        }
        if (!hasOwnProp(ds, 'queryConfig')) {
            log.error('googleDataServiceFactory.js - QueryConfig for data source "'+ dataSourceKey +'" is missing!');
            throw new Error('GoogleDataServiceFactory createInstance error: query configuration is missing!');
        }
        if (!hasOwnProp(ds, 'dateFormat')) {
            log.error('googleDataServiceFactory.js = DataSource: '+ dataSourceKey +' in the configuration is missing "dateFormat" property!');
            throw new Error('GoogleDataServiceFactory createInstance error: dateFormat property is missing!');
        }
        let queryBuilder = new GoogleQueryBuilder(log, ds.queryConfig);
        let dsConfig = { 
            dataUrl: ds.data,
            dateFormat: ds.dateFormat 
        }; 
        return new GoogleDataService(log, dsConfig, queryBuilder, window.google);
    }
}
