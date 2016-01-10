import GoogleDataService from 'www/js/services/googleDataService';
import Log from 'spec/mocks/log';
import { CONFIG } from 'spec/mocks/config';

describe('The GoogleDataService', () => {

    let service;
    let google = {
        visualization: {
            Query: () => { 
                /* return {
                    setQuery: () => { },
                    send: () => {  }
                };*/
            },
            dataTableToCsv: () => { return 'CSV Data'; }
        }
    };
    let q = {
        defer: {
            promise: '',
            resolve: () => { return null; }, 
            reject: () => { return null; }
        }
    };
    let error = null;
    let response = {
        setError: (bool) => { error = bool; },
        getDataTable: () => { return null; },
        isError: () => { return error; },
        getMessage: () => { return null; },
        getDetailedMessage: () => { return null; } 
    };

    beforeEach(() => {
        error = null;
        service = new GoogleDataService(new Log(), CONFIG, google, q);
    });

    it('expected the service to not be null', () => {
        expect(service).not.toBeNull();
    });

    it('expected the toString to not have a null value for the data key', () => {
        expect(service.toString()).toEqual({ "data": null });
    });

    it('expected the service to set itself based on config', () => {
        service.bootstrapInstance("Team 1");
        expect(service.toString()).toEqual({ "data": "data url" });
    });

    it('expected to throw an error when the no dataSourceKey passed to bootstrapInstance()', () => {
        expect(() => { service.bootstrapInstance(); }).toThrowError(Error, 'GoogleDataService bootstrap error with configuration');
    });

    it('expect isConfigValid() to return true with dataSourceKey passed', () => {
        expect(service.isConfigValid("Team 1")).toBeTruthy();
    });

    it('expect isConfigValid() to return false when no param is passed', () => {
        expect(service.isConfigValid()).toBeFalsy();
    });

    it('expect isConfigValid() to return false when config does not have dataSourceKey', () => {
        expect(service.isConfigValid('wrongDataSourceKey')).toBeFalsy();
    });
/*
    it('expect getData() to return CSV of data', () => {
        expect(service.getData()).toEqual("1234,Test Title,10/25/2015,11/2/2015,11/15/2015,12/1/2015,tag 1,tag 2,tag 3,risk 1,risk 2\n5678,Test Title,12/15/2015,12/20/2015,1/1/2016,1/15/2016,tag 1,tag 2,tag 3,risk 1,risk 2");
    });
*/
    it('expect setDataOnPromise() to not be undefined', () => {
        response.setError(false);
        expect(service.setDataOnPromise(response, q.defer)).not.toBe(undefined);
        expect(service.setDataOnPromise(response, q.defer)).toEqual('CSV Data');
    });

    it('expect setDataOnPromise() to return undefined', () => {
        response.setError(true);
        expect(service.setDataOnPromise(response, q.defer)).toBe(undefined);
    });

    it('expect isResponseError() to be true if there is an error on the response object', () => {
        response.setError(true);
        expect(service.isResponseError(response)).toBeTruthy();
    });

    it('expect isResponseError() to be false if there is not an error on the reponse object', () => {
        response.setError(false);
        expect(service.isResponseError(response)).toBeFalsy();
    });

    it('expect setQuery() to return an object that is not null', () => {
        service.bootstrapInstance("Team 1");
        expect(service.setQuery()).not.toBeNull();
    });

    it('expect setQuery() to throw an Error if the dataUrl is not set', () => {
        expect(function() { service.setQuery(); }).toThrowError(Error, 'googleDataService.setQuery - this.dataUrl was null - please set to Google Sheet that holds the data');
    });
});
