import angular from 'angular';

export default class DataFactory {

    static get $injector() {
        return ['$log','configService'];
    }

    constructor($log, configService) {
        $log.debug('dataFactory.js - in constructor!');
        this.configService = configService; 
        this.log = $log;
        this.dataServices = [];
    }

    getExtractService(dataSourceKey) {
        this.log.debug('dataFactory.js - in getDataService()');
        if (this.dataServices.hasOwnProperty(dataSourceKey)) {
            return this.dataServices[dataSourceKey];
        }

        let ds = this.configService.getDataSource(dataSourceKey);
        if (!ds.hasOwnProperty('dataServiceDriver')) {
            throw new Error('DataFactory Error with configuration! dataServiceDriver property is missing from the dataSource!');
        }

        let factory = this.getFromAngularContext(ds.dataServiceDriver); 
        let service = factory.createExtractService(this.configService, dataSourceKey);
        this.dataServices[dataSourceKey] = service;
        return service;
    }

    getTransformService(dataSourceKey) {
        this.log.debug('dataFactory.js - in getTransformService()');
        let ds = this.configService.getDataSource(dataSourceKey);
        let factory = this.getFromAngularContext(ds.dataServiceDriver);
        let transform = factory.createTransformService(this.configService, dataSourceKey);
        return transform;
    } 

    /**
    * Gets an object from the Angular context
    * @private
    * @param {string} the name of the object to get out of Angular context
    * @returns {object} the object from the Angular context
    */
    getFromAngularContext(dataServiceDriver) {
       return angular.injector(['ng','leansheetsApplication']).get(dataServiceDriver);
    }

}
