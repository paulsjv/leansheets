/**
 * The services/ directory should only include angular service definitions.
 *
 * Naming Convention:
 *
 * 1. Always include `ls-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always include `Service` suffix
 *
 * i.e. configService.js
 */
define(['angular'], function (ng) {
    'use strict';

    return ['$log','ls-jiraService', 'ls-configService',
    function ($log, jira, configService) {
        $log.debug('ls-dataSourceService - getting data source');

        /**
         * This is the factory method that is called that constructs the Data Source Service and implements
         * it's interface/api so that other types of data sources can be used in the future.
         * 
         * @param key - String and is the data source the instance uses.  In the config for the application
         *                  it is in config.instances.<key>.dataSource
         */
        this.getDataSource = function(instance) {
            switch (instance.dataSource) {
                case 'jira':
                    $log.debug('ls-dataSourceService: Constructing JIRA data service');
                    // pass in data source key to get the rest api configuration from the dataSources config in the config json
                    // pass in the date picker format if the drop down calendars are beinging used
                    // TODO: For JIRA are the two charts (histogram and control chart) going to use the date picker any longer?
                    jira.constructService(instance); //key, configService.getDataSourcesConfig(key), configService.getDatePickerMomentFormat());
                    return jira;
                    break;
                default:
                    $log.debug('No data source implemented for data source type:', key);
                    throw { err: 'No data source implemented for data source type: ' + key  };
            }
        };
    }];
});