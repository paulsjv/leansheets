import angular from 'angular';

export default class DataServiceFactory {

    static get $injector() {
        return ['$log','CONFIG'];
    }

    constructor($log, CONFIG) {
        $log.debug('dataServiceFactory.js - in constructor!');
        this.config = CONFIG; 
        this.log = $log;
    }

    getDataService(key) {
        this.log.debug('dataServiceFactory.js - in getDataService()');
        let service = angular.injector(['ng','leansheetsApplication']).get(this.config.dataSources[key].dataServiceDriver);
        service.bootstrapInstance(key);
        return service;
    }
}
