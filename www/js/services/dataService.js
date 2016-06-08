// Extract
// data = dataService.getData();

// Transform
// transfromer = transformFactory.getTransformer();
// transformed = transformer.transform(data);

// Load
// loadLocalStorage(transformed);

export default class DataService {

    constructor($log, configService, dataFactory) {
        'ngInject';

        $log.debug('dataService.js - in constructor!');
        this.configService = configService;
        this.log = $log;
        this.dataFactory = dataFactory;
    }

    getData() {
        this.log.debug('dataService.js - in getData()');
        let extractService = this.dataFactory.getExtractService("Sheet: Demo Team");
        let transformService = this.dataFactory.getTransformService("Sheet: Demo Team");
        let promise = new Promise((resolve, reject) => {
            extractService.getData().then(
                (success) => {
                    this.log.debug('dataService.js - success getting data');
                    this.log.debug(success);
                    let transformed = transformService.transformData(success);
                    this.log.debug('dataService.js - transformed data: ', transformed);
                    resolve(transformed);
                }).catch((error) => {
                this.log.error('dataService.js - error getting data');
                this.log.debug(error);
                reject(error);
            });
        });
        return promise;
    }
}
