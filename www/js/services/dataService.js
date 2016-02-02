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
        extractService.getData().then(
            (success) => {
                this.log.debug('dataService.js - success getting data');
                this.log.debug(success);
                this.log.debug('dataService.js - transformed data: ', transformService.transformData(success));
            }).catch((error) => {
                this.log.error('dataService.js - error getting data');
                this.log.debug(error);
            });

       return {};
    }
}
