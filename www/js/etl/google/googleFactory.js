import GoogleDataExtract from 'www/js/etl/google/googleDataExtract';
import GoogleQueryBuilder from 'www/js/etl/google/googleQueryBuilder';
import GoogleDataTransform from 'www/js/etl/google/googleDataTransform';
import hasOwnProp from 'www/js/utils/hasOwnProp';

var log;

/**
 * GoogleFactory builds the objects needed for ETLing data from Google Sheets.
 */
export default class GoogleFactory {

    /**
     * Constructor for the GoogleFactory
     * @public
     * @constructor
     * @param {object} $log - logger
     */
    constructor($log) {
        'ngInject';

        log = $log;
    }

    /**
     * Creates an instance of GoogleDataExtract and returns it.
     * @public
     * @param {object} configService - an instance of the application's configuration service
     * @param {string} dataSourceKey - the key to the data source in the application configuration.
     * @returns {object} GoogleDataExtract
     */
    createExtractService(configService, dataSourceKey) {
        log.debug('googleFactory.js - in createExtractService()');
        let ds = configService.getDataSource(dataSourceKey);
        if (!hasOwnProp(ds, 'data')) {
            log.error('googleFactory.js - DataSource: ' + dataSourceKey + ' in the configuration is missing "data" property!');
            throw new Error('GoogleFactory createExtractService error: data property is missing!');
        }
        if (!hasOwnProp(ds, 'queryConfig')) {
            log.error('googleFactory.js - QueryConfig for data source "' + dataSourceKey + '" is missing!');
            throw new Error('GoogleFactory createExtractService error: query configuration is missing!');
        }
        if (!hasOwnProp(ds, 'dateFormat')) {
            log.error('googleFactory.js = DataSource: ' + dataSourceKey + ' in the configuration is missing "dateFormat" property!');
            throw new Error('GoogleFactory createExtractService error: dateFormat property is missing!');
        }
        let queryBuilder = new GoogleQueryBuilder(log, ds.queryConfig);
        let dsConfig = {
            dataUrl: ds.data,
            dateFormat: ds.dateFormat
        };
        return new GoogleDataExtract(log, dsConfig, queryBuilder, window.google);
    }

    /**
     * Creates an instance of GoogleDataTransform
     * @public
     * @param {object} configService - an instance of the application's configuration service
     * @param {string} dataSourceKey - the key to the data source in the application configuration.
     * @returns {object} GoogleDataTransform
     */
    createTransformService(configService, dataSourceKey) {
        log.debug('googleFactory.js - createTransformService()');
        let qConfig = configService.getQueryConfig(dataSourceKey);
        let dsConfig = {
            queryConfig: qConfig,
            dataSourceKey: dataSourceKey
        };
        return new GoogleDataTransform(log, dsConfig);
    }
}
