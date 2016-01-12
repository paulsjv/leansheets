import GoogleDataServiceFactory from 'www/js/factories/googleDataServiceFactory';
import GoogleDataService from 'www/js/services/googleDataService';
import ConfigService from 'www/js/services/configService';
import Log from 'spec/mocks/log';
import { CONFIG } from 'spec/mocks/config';
import { Q } from 'spec/mocks/q';

describe('The GoogleDataService', () => {
    let factory;
    let configService;
    let q = Q;
    let dataSourceKey = 'Team 1';

    beforeEach(() => {
        configService = new ConfigService(new Log(), CONFIG);
        factory = new GoogleDataServiceFactory(new Log(), q);
    });

    it('expected createInstance to return GoogleDataService object', () => {
        let service = factory.createInstance(new Log(), q, configService, dataSourceKey);
        expect(service instanceof GoogleDataService).toBeTruthy();
    });

    it('expected to throw an error when the no dataSourceKey passed to createInstance()', () => {
        expect(() => { factory.createInstance(new Log(), q, configService); }).toThrowError(Error, 'undefined data source key does not exsist in the configuration');
    });

    it('expected to throw an error when there is no data property on config when calling createInstance()', () => {
        spyOn(configService, 'getDataSource').and.returnValue({});
        expect(() => { factory.createInstance(new Log(), q, configService, dataSourceKey); }).toThrowError(Error, 'GoogleDataServiceFactory createInstance error with configuration');
        expect(configService.getDataSource).toHaveBeenCalled();
    });


});
