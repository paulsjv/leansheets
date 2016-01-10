// Extract
// data = dataService.getData();

// Transform
// transfromer = transformFactory.getTransformer();
// transformed = transformer.transform(data);

// Load
// loadLocalStorage(transformed);

export default class DataService {

    static get $inject() {
        return ['$log','CONFIG','dataServiceFactory'];
    }

    constructor($log, CONFIG, dataServiceFactory) {
        $log.debug('dataService.js - in constructor!');
        this.config = CONFIG;
        this.log = $log;
        this.dataServiceFactory = dataServiceFactory;
    }

    getData() {
        this.log.debug('dataService.js - in getData()'); 
        let dataService = this.dataServiceFactory.getDataService("Sheet: Demo Team");
        dataService.getData('2014-11-01', '2015-05-01').then(
            (success) => {
                this.log.debug('dataService.js - success getting data');
                this.log.debug(success);
            }, (error) => {
                this.log.error('dataService.js - error getting data');
                this.log.debug(error);
            }
        );
        return {};
    }
}
