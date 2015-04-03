/**
 * The controllers/ directory should only include view-level angular controller definitions.
 * This DOES NOT INCLUDE controllers for use in directives. Keep those inside the directive definition.
 *
 * Naming Convention:
 *
 * 1. Always include `ls-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always include `Controller` suffix
 *
 * i.e. ls-applicationController.js
 */
define(['angular'], function (ng) {
    'use strict';

    /**
     * Returns angular "array-syntax" controller definition.
     *
     * Parameter options include all standard angular services, plus any provided by
     * module-level dependencies.
     */
    return ['$log', '$scope', 'ls-histogramService',
        function ($log, $scope, histogramService ) {

            var chartName = 'histogram',
                defaultWorkType,
                key = 0;

            $scope.dropdowns = [];  // array of work type objects

            $scope.addDropdown = function() {
                $log.debug('ls-histogramController: adding dropdown');
                $log.debug('defaultWorkType:', defaultWorkType);
                $log.debug('key:', key);
                $scope.dropdowns[key] = defaultWorkType;
                $log.debug('dropdowns:', $scope.dropdowns);
                key++;
            };

            $scope.query = function() {
                $log.debug('ls-histogramController: Calling parent controller to update histogram!');
                $log.debug('ls-histogramController: work types sending to query', $scope.dropdowns);
                updateChart();
            };

            $scope.$on('types:loaded',
                function(event, workType) {
                    $log.debug('ls-histogramController: Caught "types:loaded" event!');
                    $log.debug('ls-historgramController: Calling parent controller to update histogram');
                    defaultWorkType = workType;
                    $scope.addDropdown();
                    updateChart();
                });

            $scope.$on('chart:' + chartName,
                function(event, config) {
                    $log.debug('ls-histogramController: Caught "chart:' + chartName + '" event!');
                    $log.debug('ls-histogramController: config:', config);
                    $scope.config = config;
                });

            $scope.changeType = function(workType, key) {
                    $log.debug('ls-histogramController: changeType');
                    $log.debug('changeType workType:', workType);
                    $log.debug('changeType key:', key);
                    $scope.dropdowns[key] = workType;
                };

            var updateChart = function() {
                $scope.updateChart($scope.dropdowns, histogramService, chartName);
            };

        }];
});
