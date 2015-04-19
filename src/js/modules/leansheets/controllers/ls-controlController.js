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
    return ['$log', '$scope', 'ls-controlService',
        function ($log, $scope, controlService ) {

            var chartName = 'control',
                defaultWorkType,
                key = 0;

            $scope.dropdowns = [];  // array of work type objects

            $scope.addDropdown = function() {
                $log.debug('ls-controlController: adding dropdown');
                $scope.dropdowns = $scope.addDropdownParent($scope.dropdowns, defaultWorkType, $scope.dropdowns.length);
                key = $scope.dropdowns.length;
            };

            $scope.removeDropdown = function(key) {
                $log.debug('ls-controlController: removing dropdown');
                $scope.dropdowns = $scope.removeDropdownParent($scope.dropdowns, key);
                key = $scope.dropdowns.length;
            };

            $scope.query = function() {
                $log.debug('ls-controlController: Calling parent controller to update control chart!');
                $log.debug('ls-controlController: work types sending to query', $scope.dropdowns);
                updateChart();
            };

            $scope.$on('types:loaded',
                function(event, workType) {
                    $log.debug('ls-controlController: Caught "types:loaded" event!');
                    defaultWorkType = workType;
                    $scope.addDropdown();
                    updateChart();
                });

            $scope.$on('chart:' + chartName,
                function(event, config) {
                    $log.debug('ls-controlController: Caught "chart:' + chartName + '" event!');
                    $log.debug('ls-controlController: config:', config);
                    $scope.config = config;
                });

            $scope.changeType = function(workType, key) {
                    $log.debug('ls-controlController: changeType');
                    $scope.dropdowns[key] = workType;
                };

            var updateChart = function() {
               $log.debug('Calling parent controller to update control chart');
               $scope.updateChart($scope.dropdowns, controlService, chartName);
            };

        }];
});
