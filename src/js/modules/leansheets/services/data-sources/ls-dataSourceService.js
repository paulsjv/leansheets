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

    return ['$log','$google','ls-jiraService', 'ls-configService',
    function ($log, $google, jira, configService) {
        this.getDataSourceService = function(sheet) {
            switch (configService.getDataSourceType(sheet)) {
                case 'jira':
                    return jira
                break;
                case 'google':
                default:
                    return $google;

            }
        }
    }];
});