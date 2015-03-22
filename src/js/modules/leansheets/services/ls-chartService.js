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

    return ['$log','$q','ls-histogramService', function ($log, $q, histogramService) {

        this.getHistogram = function(workType) {
            var deferred = $q.defer(),
                promise = deferred.promise;

            if (workType !== "") {
                histogramService.getChart(workType).then(
                    function(success) {
                        deferred.resolve(success);
                    },
                    function(error) {
                        deferred.reject(error);
                        alert('Error getting data from Google Sheets! ' + error);
                    });
            } else {
                deferred.reject();
                alert(workType.name + " is not a selectable value!");
            }

            return promise;
        };

    }];
});
