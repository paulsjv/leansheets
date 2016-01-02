export default class ConfigService {

	static get $inject() {
		return ['$log','CONFIG'];
	}

	constructor($log, config) {
        this.getDataSources = function() {
            return config.dataSources;
        };

		this.getDataSource = function(key) {
			if (config.dataSources.hasOwnProperty(key)) {
				return config.dataSources[key];
			}
			return null;
		};

		this.getGlobalDataSource = function() {
			return config.globalDataSource;
		};

        this.getShowAllWork = function() {
            return config.showAllWork;
        };

        this.getDatePickerFormat = function() {
            return config.datePickerFormat;
        };

        this.getQueryDateMomentFormat = function() {
            return config.queryDateMomentFormat;
        };

        this.getDefaultHistoricalNumberOfDays = function() {
            return config.defaultHistoricalNumberOfDays;
        };

        this.getDatePickerMomentFormat = function() {
            return config.datePickerMomentFormat;
        };
    }
}
