export default class ConfigService {

	static get $inject() {
		return ['$log','CONFIG'];
	}

	constructor($log, config) {
        this.log = $log;
        this.config = config;
    }

    getDataSources() {
        return this.config.dataSources;
    }

    getDataSource(key) {
        if (this.config.dataSources.hasOwnProperty(key)) {
            return this.config.dataSources[key];
        }
        throw new Error(key + ' data source key does not exsist in the configuration');
    }

    getQueryConfig(key) {
        let ds = this.getDataSource(key);
        if (ds.hasOwnProperty('queryConfig')) {
            return ds.queryConfig;
        }
        throw new Error('There was no query configuration for ' + key + ' data source!');
    }

    getGlobalDataSource() {
        return this.config.globalDataSource;
    }

    getShowAllWork() {
        return this.config.showAllWork;
    }

    getDatePickerFormat() {
        return this.config.datePickerFormat;
    }

    getQueryDateMomentFormat() {
        return this.config.queryDateMomentFormat;
    }

    getDefaultHistoricalNumberOfDays() {
        return this.config.defaultHistoricalNumberOfDays;
    }

    getDatePickerMomentFormat() {
        return this.config.datePickerMomentFormat;
    }

}
