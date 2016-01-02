import ConfigService from 'www/js/services/configService';

describe('The service', () => {

    let	service,
		config = {
					"dataSources": { 
						"Team 1": {
							"config": "config url",
							"data": "data url"
						}, 
						"Team 2": {
							"dataSource": "JIRA",
							"data": "data url"
						}
					},
					"globalDataSource": "google",
					"debugEnabled": true,
					"showAllWork": true,
					"datePickerFormat": "mm/dd/yyyy",
					"datePickerMomentFormat": "MM/DD/YYYY",
					"queryDateMomentFormat": "YYYY-MM-DD",
					"defaultHistoricalNumberOfDays": 60
				};

    beforeEach(() => {
		service = new ConfigService({}, config);
    });

    it('expected service not to be null', () => {
        expect(service).not.toBeNull();
    });

	it('expected to have data sources equal the "dataSources" object in config', () => {
		expect(service.getDataSources()).toEqual({ "Team 1": { "config": "config url", "data": "data url" }, "Team 2": { "dataSource":"JIRA", "data":"data url" }});
	});

	it('expected to get Team 1 data source object', () => {
		expect(service.getDataSource("Team 1")).toEqual({ "config": "config url", "data": "data url" });
	});

	it('expected to get null when getDataSource is called with no parameter', () => {
		expect(service.getDataSource()).toBeNull();
	});

	it('expected to get null when getDataSource is called with parameter that does not exsist', () => {
		expect(service.getDataSource("does not exsist")).toBeNull();
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

	it('expected get data source to return null', () => {
		expect(service.getDataSource()).toBeNull();
	});

	it('expected get data source to return null when parameter does not exsist', () => {
		expect(service.getDataSource('does not exsist')).toBeNull();
	});
});
