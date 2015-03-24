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
        this.getDataUrl = function() {
            return config.dataUrl;
        };

        this.getConfigUrl = function() {
            return config.configUrl;
        };

        this.getQueryStartDate = function() {
            return config.queryStartDate;
        };

        this.getQueryEndDate = function() {
            return config.queryEndDate;
        };

        this.getQueryNoEndDate = function() {
            return config.queryNoEndDate;
        };

        this.getShowAllWork = function() {
            return config.showAllWork;
        };
    }];
});
