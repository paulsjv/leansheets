/**
 * The services/ directory should only include angular service definitions.
 *
 * Naming Convention:
 *
 * 1. Always include `ls-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always include `Service` suffix
 *
 * i.e. ls-googleConfigService.js
 */
define(['angular'], function (ng) {
    'use strict';

    return ['$log','CONFIG', function ($log, config) {
        this.getDataSourceType = function(key) {
            return config.sheets[key].dataSource;
        };

        this.getSheets = function() {
            return config.sheets;
        };

        this.getDataUrl = function(key) {
            if (config.sheets.hasOwnProperty(key)) {
                return config.sheets[key].dataUrl;
            }
            return null;
        };

        this.getConfigUrl = function(key) {
            if (config.sheets.hasOwnProperty(key)){
                return config.sheets[key].configUrl;
            }
            return null;
        };

        this.getShowAllWork = function() {
            return config.showAllWork;
        };

        this.getCacheTtl = function() {
            return config.cacheTtl;
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
    }];
});
