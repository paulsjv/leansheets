import DataServiceFactory from 'www/js/factories/dataServiceFactory';
import ConfigService from 'www/js/services/configService';
import Log from 'spec/mocks/log';
import { CONFIG } from 'spec/mocks/config';

describe('The DataServiceFactory', () => {

    let factory;
    let configService;

    beforeEach(() => {
        let dataFactory = jasmine.createSpyObj(dataFactory, ['createInstanceDataService']);
        dataFactory.createInstanceDataService.and.returnValue({});
        configService = new ConfigService(new Log(), CONFIG);
        factory = new DataServiceFactory(new Log(), configService);
        spyOn(factory, 'getFromAngularContext').and.returnValue(dataFactory);
    });

    it('expected the factory to not be null', () => {
        expect(factory).not.toBeNull();
    });

    it('expected the getDataService to not be null', () => {
        var ds = factory.getDataService("Team 1");
        expect(ds).not.toBeNull();
    });

    it('expected the getDataService() to throw Error when data source does not exsist', () => {
        spyOn(configService, 'getDataSource').and.returnValue({});
        expect(() => { factory.getDataService("doesNotExsist"); }).toThrowError(Error, 'DataServiceFactory Error with configuration! dataServiceDriver property is missing from the dataSource!');
        expect(configService.getDataSource).toHaveBeenCalled();
    });

});
