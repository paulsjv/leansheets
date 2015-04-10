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

            $scope.updateChart = function(workTypes, chart, chartName) {
                $log.debug('updateChart: ls-applicationController');
                if (areWorkTypesValid(workTypes)) {
                    chart.getChart(workTypes).then(
                        function(success) {
                            $log.debug('Firing "chart:' + chartName + '" event: ls-applicationController!');
                            $scope.$broadcast('chart:' + chartName, success);
                        }, function(error) {
                            $log.debug('Error getting data from Google Sheets!', error);
                             alert('Error getting data from Google Sheets! ' + error);
                        });
                } 

            };

            $scope.addDropdownParent = function(dropdowns, defaultWorkType, key) {
                $log.debug('ls-applicationController: addDropdownParent()');
                dropdowns[key] = defaultWorkType;
                return dropdowns;
            };

            $scope.removeDropdownParent = function(dropdowns, key) {
                $log.debug('ls-applicationController: removeDropdownParent()');
                $log.debug('key:',key);
                $log.debug('dropdowns:',dropdowns);
                if (key === 0) {
                    dropdowns.shift();
                } else if ((key+1) === dropdowns.length) {
                    dropdowns.pop();
                } else {
                    dropdowns.splice(key,1);
                }
                return dropdowns;
            };

            var areWorkTypesValid = function(workTypes) {
                var valid = true,
                    message = '';
                workTypes.forEach(function(type) {
                    if (type.column === "" || (type.column === "showAllWork" && workTypes.length > 1)) {
                        valid = false;
                        message += type.name + "\n";
                    }
                });
                if (workTypes.length === 0) {
                    valid = false;
                    alert('Please add a Class of Service'); 
                } else if (valid === false) {
                    alert(message + 'These selections are not selectable value(s)!');
                }
                return valid;
            };

    }];
});
