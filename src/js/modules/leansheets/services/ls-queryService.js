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

    return ['$log','ls-configService', function ($log, configService) {

        var dataQuery = "select D, E, A, B, C where D is not null AND toDate(D) >= toDate(date '%sd') AND toDate(D) <= toDate(date '%ed') AND %t order by D",
            cfdStartQuery = "select C, count(A) where %t and C is not null and toDate(C) >= toDate(date '%sd') AND toDate(C) <= toDate(date '%ed') group by C",
            cfdEndQuery = "select D, count(A) where %t and D is not null and toDate(C) >= toDate(date '%sd') AND toDate(C) <= toDate(date '%ed') group by D",
            configQuery = 'select *';

        this.getDataQuery = function(type) {
            return dataQuery.replace('%sd', configService.getQueryStartDate())
                            .replace('%ed', configService.getQueryEndDate())
                            .replace('%t', type.column + " = '" + type.name + "'");
        };

        this.getCfdStartQuery = function(type) {
            return cfdStartQuery.replace('%sd', configService.getQueryStartDate())
                                .replace('%ed', configService.getQueryEndDate())
                                .replace("%t", type.column + " = '" + type.name + "'");
        };

        this.getCfdEndQuery = function(type) {
            return cfdEndQuery.replace('%sd', configService.getQueryStartDate())
                              .replace('%ed', configService.getQueryEndDate())
                              .replace("%t", type.column + " = '" + type.name + "'");
        };

        this.getConfigQuery = function() {
            return configQuery;
        };
    }];
});
