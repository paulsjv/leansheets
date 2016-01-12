import GoogleDataServiceFactory from 'www/js/factories/googleDataServiceFactory';
import GoogleDataService from 'www/js/services/googleDataService';
import ConfigService from 'www/js/services/configService';
import Log from 'spec/mocks/log';
import { CONFIG } from 'spec/mocks/config';

describe('The GoogleDataService', () => {
    let factory;
    let configService;
    let dataSourceKey = 'Team 1';

    beforeEach(() => {
        configService = new ConfigService(new Log(), CONFIG);
        factory = new GoogleDataServiceFactory(new Log());
    });

    it('expected createInstance to return GoogleDataService object', () => {
        let service = factory.createInstance(new Log(), configService, dataSourceKey);
        expect(service instanceof GoogleDataService).toBeTruthy();
    });

    it('expected to throw an error when the no dataSourceKey passed to createInstance()', () => {
        spyOn(configService, 'getDataSource').and.throwError('error');
        expect(() => { factory.createInstance(new Log(), configService); }).toThrowError('error');
    });

    it('expected to throw an error when there is no data property on config when calling createInstance()', () => {
        spyOn(configService, 'getDataSource').and.returnValue({});
        expect(() => { factory.createInstance(new Log(), configService, dataSourceKey); }).toThrowError(Error, 'GoogleDataServiceFactory createInstance error with configuration');
        expect(configService.getDataSource).toHaveBeenCalled();
    });


});
