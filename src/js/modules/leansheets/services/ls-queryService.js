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

        var dataQuery = "select D, E, A, B, C where D is not null AND toDate(D) >= toDate(date '%sd') AND toDate(D) <= toDate(date '%ed') %t order by D",
            cfdStartQuery = "select C, count(A) where %t C is not null AND toDate(C) >= toDate(date '%sd') AND toDate(C) <= toDate(date '%ed') group by C",
            cfdEndQuery = "select D, count(A) where %t D is not null AND toDate(C) >= toDate(date '%sd') AND toDate(C) <= toDate(date '%ed') group by D",
            configQuery = 'select *',

            showAllWork = function(showAllWork, query, string) {
                if (showAllWork === "showAllWork") {
                    return query.replace('%t','');
                }
                return query.replace('%t', string);
            };

        this.getDataQuery = function(types) {
            $log.debug('ls-queryService: getDataQuery');
            var where = '';

            types.forEach(function(type) {
                where += ' AND ' + type.column + " = '" + type.name + "'";
            });

            return showAllWork(types[0].column,
                           dataQuery.replace('%sd', configService.getQueryStartDate())
                                    .replace('%ed', configService.getQueryEndDate()),
                            where);
        };

        this.getCfdStartQuery = function(types) {
            var where = '';

            types.forEach(function(type) {
                where += type.column + " = '" + type.name + "' AND ";
            });

            return showAllWork(types[0].column,
                               cfdStartQuery.replace('%sd', configService.getQueryStartDate())
                                            .replace('%ed', configService.getQueryEndDate()),
                               where);
        };

        this.getCfdEndQuery = function(types) {
            var where = '';

            types.forEach(function(type) {
                where += type.column + " = '" + type.name + "' AND ";
            });

            return showAllWork(types[0].column,
                               cfdEndQuery.replace('%sd', configService.getQueryStartDate())
                                          .replace('%ed', configService.getQueryEndDate()),
                               where);
        };

        this.getConfigQuery = function() {
            return configQuery;
        };
    }];
});
