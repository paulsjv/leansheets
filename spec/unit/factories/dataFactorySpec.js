import DataFactory from 'www/js/factories/dataFactory';
import ConfigService from 'www/js/services/configService';
import Log from 'spec/mocks/log';
import { CONFIG } from 'spec/mocks/config';

describe('The DataFactory', () => {

    let factory;
    let configService;

    beforeEach(() => {
        let dataFactory = jasmine.createSpyObj(dataFactory, ['createExtractService','createTransformService']);
        dataFactory.createExtractService.and.returnValue({});
        dataFactory.createTransformService.and.returnValue({});
        configService = new ConfigService(new Log(), CONFIG);
        factory = new DataFactory(new Log(), configService);
        spyOn(factory, 'getFromAngularContext').and.returnValue(dataFactory);
    });

    it('expected the factory to not be null', () => {
        expect(factory).not.toBeNull();
    });

    it('expected the getExtractService to not be null', () => {
        var ds = factory.getExtractService("Team 1");
        expect(ds).not.toBeNull();
    });

    it('expected the getExtractService to throw Error when data source does not exsist', () => {
        spyOn(configService, 'getDataSource').and.returnValue({});
        expect(() => { factory.getExtractService("doesNotExsist"); }).toThrowError(Error, 'DataFactory Error with configuration! dataServiceDriver property is missing from the dataSource!');
        expect(configService.getDataSource).toHaveBeenCalled();
    });

    it('expected to getTransformService to not be null', () => {
        let tf = factory.getTransformService("Team 1");
        expect(tf).not.toBeNull();
    });
});
