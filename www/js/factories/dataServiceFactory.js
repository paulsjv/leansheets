import angular from 'angular';

export default class DataServiceFactory {

    static get $injector() {
        return ['$log','configService'];
    }

    constructor($log, configService) {
        $log.debug('dataServiceFactory.js - in constructor!');
        this.configService = configService; 
        this.log = $log;
        this.dataServices = [];
    }

    getDataService(dataSourceKey) {
        this.log.debug('dataServiceFactory.js - in getDataService()');
        if (this.dataServices.hasOwnProperty(dataSourceKey)) {
            return this.dataServices[dataSourceKey];
        }

        let ds = this.configService.getDataSource(dataSourceKey);
        if (!ds.hasOwnProperty('dataServiceDriver')) {
            throw new Error('DataServiceFactory Error with configuration! dataServiceDriver property is missing from the dataSource!');
        }

        let factory = this.getFromAngularContext(ds.dataServiceDriver); 
        let service = factory.createInstanceDataService(this.log, this.configService, dataSourceKey);
        this.dataServices[dataSourceKey] = service;
        return service;
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
