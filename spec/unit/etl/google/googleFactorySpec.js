import GoogleFactory from 'www/js/etl/google/googleFactory';
import GoogleDataExtract from 'www/js/etl/google/googleDataExtract';
import GoogleDataTransform from 'www/js/etl/google/googleDataTransform';
import ConfigService from 'www/js/services/configService';
import Log from 'spec/mocks/log';
import { CONFIG } from 'spec/mocks/config';

describe('The GoogleFactory', () => {
    let factory;
    let configService;
    let dataSourceKey = 'Team 1';

    beforeEach(() => {
        configService = new ConfigService(new Log(), CONFIG);
        factory = new GoogleFactory(new Log());
    });

    /**
    * Extract createInstanceDataExtractService tests
    */
    it('expected createExtractService to return GoogleDataExtract object', () => {
        let service = factory.createExtractService(configService, dataSourceKey);
        expect(service instanceof GoogleDataExtract).toBeTruthy();
    });

    it('expected to throw an error when the no dataSourceKey passed to createExtractService()', () => {
        spyOn(configService, 'getDataSource').and.throwError('error');
        expect(() => { factory.createExtractService(configService); }).toThrowError('error');
    });

    it('expected to throw an error when there is no data property on config when calling createExtractService()', () => {
        spyOn(configService, 'getDataSource').and.returnValue({});
        expect(() => { factory.createExtractService(configService, dataSourceKey); }).toThrowError(Error, 'GoogleFactory createExtractService error: data property is missing!');
        expect(configService.getDataSource).toHaveBeenCalled();
    });

    it('expected to throw an error when there is no queryConfig property on config when calling createExtractService()', () => {
        spyOn(configService, 'getDataSource').and.returnValue({ 'data': 'dataUrl' });
        expect(() => { factory.createExtractService(configService, dataSourceKey); }).toThrowError(Error, 'GoogleFactory createExtractService error: query configuration is missing!');
        expect(configService.getDataSource).toHaveBeenCalled();
    });

    it('expected to throw an error when there is no dateFormat property on config when calling createExtractService()', () => {
        spyOn(configService, 'getDataSource').and.returnValue({ 'data': 'dataUrl', 'queryConfig': 'queryConfig' });
        expect(() => { factory.createExtractService(configService, dataSourceKey); }).toThrowError(Error, 'GoogleFactory createExtractService error: dateFormat property is missing!');
        expect(configService.getDataSource).toHaveBeenCalled();
    });

    /**
    * Transform createInstanceTransformService tests
    */
    it('expected createTransformService to return GoogleDataTransform object', () => {
        let transform = factory.createTransformService(configService,'Team 1');
        expect(transform instanceof GoogleDataTransform).toBeTruthy();
    }); 
});
