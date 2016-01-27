// Extract
// data = dataService.getData();

// Transform
// transfromer = transformFactory.getTransformer();
// transformed = transformer.transform(data);

// Load
// loadLocalStorage(transformed);

export default class DataService {

    static get $inject() {
        return ['$log','configService','dataFactory'];
    }

    constructor($log, configService, dataFactory) {
        $log.debug('dataService.js - in constructor!');
        this.configService = configService;
        this.log = $log;
        this.dataFactory = dataFactory;
    }

    getData() {
        this.log.debug('dataService.js - in getData()'); 
        let extractService = this.dataFactory.getExtractService("Sheet: Demo Team");
        let data = null;
        extractService.getData().then(
            (success) => {
                this.log.debug('dataService.js - success getting data');
                this.log.debug(success);
                data = success;
            }).catch((error) => {
                this.log.error('dataService.js - error getting data');
                this.log.debug(error);
            });

        let transformService = this.dataFactory.getTransformService("Sheet: Demo Team");
        transformService.transformData(data);
        return {};
    }
}
