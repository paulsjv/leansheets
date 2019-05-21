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

    return ['$log','ls-googleService','ls-jiraService', 'ls-configService',
    function ($log, googleService, jira, configService) {
        $log.debug('ls-dataSourceService - getting data source');
        this.getDataSourceService = function(sheet) {
            switch (configService.getDataSourceType(sheet)) {
                case 'jira':
                    $log.debug('JIRA datasource');
                    jira.constructService(sheet, configService.getDataSourceConfig(sheet), configService.getDatePickerMomentFormat());
                    return jira
                break;
                case 'google':
                default:
                    $log.debug('Google Sheets data source');
                    googleService.constructService(sheet);
                    return googleService;

            }
        }
    }];
});