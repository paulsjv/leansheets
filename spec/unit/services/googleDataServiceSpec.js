import GoogleDataService from 'www/js/services/googleDataService';
import ConfigService from 'www/js/services/configService';
import Log from 'spec/mocks/log';
import { CONFIG } from 'spec/mocks/config';

describe('The GoogleDataService', () => {

    let service;
    let configService;
    let google = {
        visualization: {
            Query: () => { }
        }
    };
    let response = {
        getDataTable: () => { return { toJSON: () => { return 'JSON Data'; } }; },
        isError: () => { return null; },
        getMessage: () => { return null; },
        getDetailedMessage: () => { return null; } 
    };
    let dsConfig = {
        dataUrl: "data url"
    };
    let resolve = (obj) => { return obj; };
    let reject = (obj) => { return obj; };

    beforeEach(() => {
        configService = new ConfigService(new Log(), CONFIG);
        service = new GoogleDataService(new Log(), dsConfig, google);
    });

    it('expected the service to not be null', () => {
        expect(service).not.toBeNull();
    });

    it('expected the toString to not have a null value for the data key', () => {
        expect(service.toString()).toEqual({ "this.dataUrl": "data url" });
    });

   it('expect setDataOnPromise() to not be undefined', () => {
        spyOn(response, 'isError').and.returnValue(false);
        expect(service.setDataOnPromise(response, resolve, reject)).not.toBe(undefined);
        expect(service.setDataOnPromise(response, resolve, reject)).toEqual('JSON Data');
        expect(response.isError).toHaveBeenCalled();
    });

    it('expect setDataOnPromise() to return undefined', () => {
        spyOn(response, 'isError').and.returnValue(true);
        expect(service.setDataOnPromise(response, resolve, reject)).toBe(undefined);
        expect(response.isError).toHaveBeenCalled();
    });

    it('expect isResponseError() to be true if there is an error on the response object', () => {
        spyOn(response, 'isError').and.returnValue(true);
        expect(service.isResponseError(response)).toBeTruthy();
        expect(response.isError).toHaveBeenCalled();
    });

    it('expect isResponseError() to be false if there is not an error on the reponse object', () => {
        spyOn(response, 'isError').and.returnValue(false);
        expect(service.isResponseError(response)).toBeFalsy();
        expect(response.isError).toHaveBeenCalled();
    });

    it('expect setQuery() to return an object that is not null', () => {
        expect(service.setQuery()).not.toBeNull();
    });

    it('expect setQuery() to throw an Error if the dataUrl is not set', () => {
        let service = new GoogleDataService(new Log(), { dataUrl: null }, google);
        expect(() => { service.setQuery(); }).toThrowError(Error, 'googleDataService.setQuery - this.dataUrl was null - please set to Google Sheet that holds the data');
    });
});
