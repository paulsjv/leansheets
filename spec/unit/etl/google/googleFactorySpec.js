import GoogleFactory from 'www/js/etl/google/googleFactory';
import GoogleDataService from 'www/js/etl/google/googleDataService';
import ConfigService from 'www/js/services/configService';
import Log from 'spec/mocks/log';
import { CONFIG } from 'spec/mocks/config';

describe('The GoogleDataService', () => {
    let factory;
    let configService;
    let dataSourceKey = 'Team 1';

    beforeEach(() => {
        configService = new ConfigService(new Log(), CONFIG);
        factory = new GoogleFactory(new Log());
    });

    it('expected createInstance to return GoogleDataService object', () => {
        let service = factory.createInstanceDataService(new Log(), configService, dataSourceKey);
        expect(service instanceof GoogleDataService).toBeTruthy();
    });

    it('expected to throw an error when the no dataSourceKey passed to createInstance()', () => {
        spyOn(configService, 'getDataSource').and.throwError('error');
        expect(() => { factory.createInstanceDataService(new Log(), configService); }).toThrowError('error');
    });

    it('expected to throw an error when there is no data property on config when calling createInstance()', () => {
        spyOn(configService, 'getDataSource').and.returnValue({});
        expect(() => { factory.createInstanceDataService(new Log(), configService, dataSourceKey); }).toThrowError(Error, 'GoogleFactory createInstance error: data property is missing!');
        expect(configService.getDataSource).toHaveBeenCalled();
    });

    it('expected to throw an error when there is no queryConfig property on config when calling createInstance()', () => {
        spyOn(configService, 'getDataSource').and.returnValue({ 'data': 'dataUrl' });
        expect(() => { factory.createInstanceDataService(new Log(), configService, dataSourceKey); }).toThrowError(Error, 'GoogleFactory createInstance error: query configuration is missing!');
        expect(configService.getDataSource).toHaveBeenCalled();
    });

    it('expected to throw an error when there is no dateFormat property on config when calling createInstance()', () => {
        spyOn(configService, 'getDataSource').and.returnValue({ 'data': 'dataUrl', 'queryConfig': 'queryConfig' });
        expect(() => { factory.createInstanceDataService(new Log(), configService, dataSourceKey); }).toThrowError(Error, 'GoogleFactory createInstance error: dateFormat property is missing!');
        expect(configService.getDataSource).toHaveBeenCalled();
    });

});
