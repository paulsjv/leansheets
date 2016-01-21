import ConfigService from 'www/js/services/configService';
import { CONFIG } from 'spec/mocks/config';
import Log from 'spec/mocks/log';

describe('The ConfigService', () => {

    let	service;
    let log = new Log();

    beforeEach(() => {
		service = new ConfigService(log, CONFIG);
    });

    it('expected service not to be null', () => {
        expect(service).not.toBeNull();
    });

	it('expected to have data sources equal the "dataSources" object in config', () => {
        let ds = service.getDataSources();
        expect(Object.keys(ds)).toEqual(jasmine.arrayContaining(['Team 1','Team 2']));
	});

	it('expected to get Team 1 data source object', () => {
        let ds = service.getDataSource('Team 1');
        expect(Object.keys(ds)).toEqual(jasmine.arrayContaining(['config','data','dataServiceDriver','queryConfig']));
	});

	it('expected getDataSource to throw Error when called with no parameter', () => {
		expect(() => { service.getDataSource(); }).toThrowError(Error, 'undefined data source key does not exsist in the configuration');
	});

	it('expected getDataSource to throw Error when called with parameter that does not exsist', () => {
		expect(() => { service.getDataSource("doesNotExsist"); }).toThrowError(Error, 'doesNotExsist data source key does not exsist in the configuration');
	});

	it('expected to have show all work to be true', () => {
		expect(service.getShowAllWork()).toBe(true);
	});

	it('expected to have the date picker format to be mm/dd/yyyy', () => {
		expect(service.getDatePickerFormat()).toEqual('mm/dd/yyyy');
	});

	it('expected to have query date moment format to be YYYY-MM-DD', () => {
		expect(service.getQueryDateMomentFormat()).toEqual('YYYY-MM-DD');
	}); 

	it('expected default historical number of days to be 60', () => { 
		expect(service.getDefaultHistoricalNumberOfDays()).toEqual(60);
	});

	it('expected date picker moment format to be MM/DD/YYYY', () => {
		expect(service.getDatePickerMomentFormat()).toEqual('MM/DD/YYYY');	
	});

	it('expected to get global data source to be "google"', () => {
		expect(service.getGlobalDataSource()).toEqual('google');
	});

	it('expected to get data source to be "JIRA"', () => {
		expect(service.getDataSource("Team 2").dataSource).toEqual('JIRA');
	});

	it('expected getDataSource to return googleDataService', () => {
		expect(service.getDataSource("Team 1").dataServiceDriver).toEqual('GoogleFactory');
	});

    it('expected getQueryConfig to return config object', () => {
        let qConfig = service.getQueryConfig('Team 1');
        expect(Object.keys(qConfig)).toEqual(['id','description','link','states','tags','risks']);
    });

    it('expected getQueryConfig to throw error if no queryConfig property', () => {
        let config = { 'dataSources': { 'Team 1': { } } };
        let service = new ConfigService(log, config);
        expect(() => { service.getQueryConfig('Team 1'); }).toThrowError(Error, 'There was no query configuration for Team 1 data source!');
    });

});
