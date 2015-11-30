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

    return ['$log','ls-configService', '$moment', function ($log, configService, $moment) {

        var dataQuery = "select D, E, A, B, C where D is not null AND toDate(D) >= toDate(date '%sd') AND toDate(D) <= toDate(date '%ed') %t order by D",
            cfdStartQuery = "select C, count(A) where %t C is not null AND toDate(C) >= toDate(date '%sd') AND toDate(C) <= toDate(date '%ed') group by C",
            cfdEndQuery = "select D, count(A) where %t D is not null AND toDate(C) >= toDate(date '%sd') AND toDate(D) <= toDate(date '%ed') group by D",
            configQuery = 'select *',

            showAllWork = function(showAllWork, query, string) {
                if (showAllWork === "showAllWork") {
                    return query.replace('%t','');
                }
                return query.replace('%t', string);
            };

        this.getDataQuery = function(obj) {
            $log.debug('ls-queryService: getDataQuery');
            $log.debug('ls-queryService: obj', obj);
            var where = '',
                query;

            obj.workTypes.forEach(function(type) {
                where += ' AND ' + type.column + " = '" + type.name + "'";
            });

            query = showAllWork(obj.workTypes[0].column,
                           dataQuery.replace('%sd', getDate(obj.startDate))
                                    .replace('%ed', getDate(obj.endDate)),
                            where);
            $log.debug('ls-queryService: query', query);
            return query;
        };

        var getDate = function(date) {
            $log.debug('ls-queryService: getDate:',date);
            var newDate = $moment(date, configService.getDatePickerMomentFormat())
                    .format(configService.getQueryDateMomentFormat());
            $log.debug('ls-queryService: newDate:', newDate);
            return newDate;
        };

        this.getCfdStartQuery = function(obj) {
            var where = '';

            obj.workTypes.forEach(function(type) {
                where += type.column + " = '" + type.name + "' AND ";
            });

            return showAllWork(obj.workTypes[0].column,
                               cfdStartQuery.replace('%sd', getDate(obj.startDate))
                                            .replace('%ed', getDate(obj.endDate)),
                               where);
        };

        this.getCfdEndQuery = function(obj) {
            var where = '';

            obj.workTypes.forEach(function(type) {
                where += type.column + " = '" + type.name + "' AND ";
            });

            return showAllWork(obj.workTypes[0].column,
                               cfdEndQuery.replace('%sd', getDate(obj.startDate))
                                          .replace('%ed', getDate(obj.endDate)),
                               where);
        };

        this.getConfigQuery = function() {
            return configQuery;
        };
    }];
});
