import GoogleDataService from 'www/js/etl/google/googleDataService';
import Log from 'spec/mocks/log';

describe('The GoogleDataService', () => {

    let service;
    let response = {
        getDataTable: () => { return null; },
        isError: () => { return null; },
        getMessage: () => { return null; },
        getDetailedMessage: () => { return null; } 
    };
    let google = {
        visualization: {
            Query: () => { 
                return {
                    send: (callback) => {
                        callback(response);
                    },
                    setQuery: () => { }
                };  
            }
        }
    };

    beforeEach(() => {
        let queryBuilder = jasmine.createSpyObj('queryBuilder',['getQuery']);
        queryBuilder.getQuery.and.returnValue('query');
        let dsConfig = {
             dataUrl: "data url",
             dateFormat: "YYYY-MM-DD"
         };
        let log = new Log();
        service = new GoogleDataService(log, dsConfig, queryBuilder, google);
    });

    it('expected to return a promise successfully with the value of JSON', (done) => {
        let dataTable = jasmine.createSpyObj(dataTable, ['toJSON']);
        dataTable.toJSON.and.returnValue('JSON');
        spyOn(response,'isError').and.returnValue(false);
        spyOn(response,'getDataTable').and.returnValue(dataTable);
        spyOn(response,'getDetailedMessage').and.returnValue('getDetailedMessage');
        spyOn(response,'getMessage').and.returnValue('getMessage');

        service.getData('2015-12-31','2016-01-15').then((success) => {
                        expect(success).toEqual('JSON');
                        done();
                    });
        expect(response.isError).toHaveBeenCalled();
        expect(response.getDataTable).toHaveBeenCalled();
        expect(dataTable.toJSON).toHaveBeenCalled();
    });

    it('expected to have a response error and reject promise', (done) => {
        spyOn(response, 'isError').and.returnValue(true);
        spyOn(response, 'getDetailedMessage').and.returnValue('getDetailedMessage');
        spyOn(response, 'getMessage').and.returnValue('getMessage');

        service.getData('2015-12-31','2016-01-15')
                .catch((error) => {
                    expect(error).toEqual('Error in query: getMessage getDetailedMessage');
                    done();
                }); 

        expect(response.isError).toHaveBeenCalled();
        expect(response.getDetailedMessage).toHaveBeenCalled();
        expect(response.getMessage).toHaveBeenCalled();
    });

    it('expect getData() to throw an Error if the dataUrl is not set', (done) => {
        let queryBuilder = jasmine.createSpyObj(queryBuilder,['getQuery']);
        queryBuilder.getQuery.and.returnValue('query');

        let queryConfig = { dataUrl: null, dateFormat: 'YYYY-MM-DD' };
        let service = new GoogleDataService(new Log(), queryConfig, queryBuilder, google);

        service.getData('2015-12-31','2016-02-15')
                .catch((error) => {
                    expect(error).toEqual('googleDataService.setQuery - dataUrl was null - please set to Google Sheet that holds the data');
                    done();
                });
        
        expect(queryBuilder.getQuery).toHaveBeenCalled();
    });

    it('expect getData() to throw an Error if the startDate or endDate is not valid', () => {
        let queryBuilder = null;
        let queryConfig = { dataUrl: null, dateFormat: 'YYYY-MM-DD' };
        let service = new GoogleDataService(new Log(), queryConfig, queryBuilder, google);

        expect(() => { service.getData('start date','2016-02-15'); })
                    .toThrowError(Error,'GoogleQueryBuilder - start date: "start date" and/or end date: "2016-02-15" was not a valid date!');

        expect(() => { service.getData('2015-12-31','end date'); })
                    .toThrowError(Error, 'GoogleQueryBuilder - start date: "2015-12-31" and/or end date: "end date" was not a valid date!');
    });

});
