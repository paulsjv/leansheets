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
    return ['$log','$scope','ls-typeService','ls-configService',
        function ($log, $scope, typeService, configService) {

            $scope.startDate = configService.getQueryStartDate();
            $scope.endDate = configService.getQueryEndDate();
            $scope.workType;
            $scope.workTypes;

            typeService.getWorkTypes().then(
                function(success) {
                    $log.log('Got work types: ls-applicationController', success);
                    $scope.workTypes = success;
                    $scope.workType = $scope.workTypes[0].column != "" ? $scope.workTypes[0] : $scope.workTypes[1];
    
                    // broadcast event to all child contorllers so they will draw their charts
                    $log.debug('Firing "types:loaded" event: ls-applicationController');
                    $scope.$broadcast('types:loaded', $scope.workType);
                }, function(error) {
                    $log.log('Error getting work types: ls-applicationController!', error);
                    alert('Error getting work types! ' + error);
                });

            $scope.updateChart = function(workType, chart, chartName) {
                $log.debug('updateChart: ls-applicationController');
                if (workType.column !== "") {
                    chart.getChart(workType).then(
                        function(success) {
                            $log.debug('Firing "chart:' + chartName + '" event: ls-applicationController!');
                            $scope.$broadcast('chart:' + chartName, success);
                        }, function(error) {
                            $log.debug('Error getting data from Google Sheets!', error);
                             alert('Error getting data from Google Sheets! ' + error);
                        });
                } else { alert(workType.name + " is not a selectable value!"); }

            };

    }];
});
