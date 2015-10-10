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
    return ['$log', '$scope', 'ls-cfdService',
        function ($log, $scope, cfdService ) {

            var chartName = 'cfd',
                defaultWorkType,
                key = 0;

            // array of work type objects
            $scope.dropdowns = [];

            // used for directive date range picker
            // two attributs are two way bound so if it changes in the UI
            // it will change in the controller and directive
            $scope.startDate;
            $scope.endDate;

            $scope.addDropdown = function() {
                $log.debug('ls-cfdController: adding dropdown');
                $scope.dropdowns = $scope.addDropdownParent($scope.dropdowns, defaultWorkType, $scope.dropdowns.length);
                key = $scope.dropdowns.length;
            };

            $scope.removeDropdown = function(key) {
                $log.debug('ls-cfdController: removing dropdown');
                $scope.dropdowns = $scope.removeDropdownParent($scope.dropdowns, key);
                key = $scope.dropdowns.length;
            };

            var removeAllDropdowns = function() {
                // loop through $scope.dropdowns and remove one at a time calling
                // $scope.removeDropdown() the key is just a running $index that starts at 0
                for (var i = 0; i < $scope.dropdowns.length; i++) {
                    $scope.removeDropdown(i);
                }
            };

            $scope.query = function() {
                $log.debug('ls-cfdController: Calling parent controller to update control chart!');
                $log.debug('ls-cfdController: work types sending to query', $scope.dropdowns);
                updateChart();
            };

            $scope.$on('types:loaded',
                function(event, workType) {
                    $log.debug('ls-cfdController: Caught "types:loaded" event!');
                    defaultWorkType = workType;
                    removeAllDropdowns();
                    $scope.addDropdown();
                    $scope.startDate = $scope.getDefaultStartDate();
                    $scope.endDate = $scope.getDefaultEndDate();
                    updateChart();
                });

            $scope.$on('chart:' + chartName,
                function(event, config) {
                    $log.debug('ls-cfdController: Caught "chart:' + chartName + '" event!');
                    $log.debug('ls-cfdController: config', config);
                    $scope.config = config;
                });

            $scope.changeType = function(workType, key) {
                    $log.debug('ls-cfdController: changeType');
                    $scope.dropdowns[key] = workType;
                };

            var updateChart = function() {
                $log.debug('ls-cfdController: Calling parent controller to update control chart');
                $log.debug('ls-cfdController: start date:', $scope.startDate);
                $log.debug('ls-cfdController: end date:', $scope.endDate);
                var obj = {
                    workTypes: $scope.dropdowns,
                    startDate: $scope.startDate,
                    endDate: $scope.endDate
                };
                $log.debug('ls-cfdController: obj:', obj);
                $scope.updateChart(obj, cfdService, chartName);
            };
        }];
});
