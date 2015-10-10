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
    return ['$log','$scope','ls-typeService','ls-configService','$moment',
        function ($log, $scope, typeService, configService, $moment) {

            $scope.workType;
            $scope.workTypes;

            var configSheets = {
                "team 1": {
                    "dataUrl":"",
                    "configUrl":""
                },
                "team 2": {
                    "dataUrl":"",
                    "configUrl":""
                }
            };
            
            // in configSercice there needs to be a function to get the sheets keys
            // example: configService.getConfigKeys()
            // the keys populate the dropdowns for teams and that key should be passed
            // to the getWorkTypes function this in turn should pass the key for the data
            // and config keys to get the google urls for each.  I'm hoping that since the
            // typeService.getWorkTypes success functions broadcase an event down to all of
            // the charting controllers they should redraw accordingly.
            $scope.sheetsKeys = Object.keys(configSheets);
            $scope.sheet = $scope.sheetsKeys[0];
            $scope.sheets = configSheets;

            $scope.changeSheet = function(sheet) {
                // refresh workTypes
                $log.debug("changing sheet");
                $scope.sheet = sheet;
                getWorkTypes(sheet);
            };

            var getWorkTypes = function(sheet) {
                typeService.getWorkTypes(sheet).then(
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
            };

            getWorkTypes($scope.sheet);

            $scope.updateChart = function(obj, chart, chartName) {
                $log.debug('updateChart: ls-applicationController');
                if (areWorkTypesValid(obj.workTypes) &&
                        areDatesValid(obj.startDate, obj.endDate)) {
                    chart.getChart(obj).then(
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
                if (key === 0) {
                    dropdowns.shift();
                } else if ((key+1) === dropdowns.length) {
                    dropdowns.pop();
                } else {
                    dropdowns.splice(key,1);
                }
                return dropdowns;
            };

            // returns current date minus number of days to subtract 
            // from current date that is supplied in the config.json
            $scope.getDefaultStartDate = function() {
                return $moment()
                            .subtract(configService.getDefaultHistoricalNumberOfDays(),'days')
                            .format(configService.getDatePickerMomentFormat());
            };

            // returns current date
            $scope.getDefaultEndDate = function() {
                return $moment().format(configService.getDatePickerMomentFormat());
            };

            var areDatesValid = function(startDate, endDate) {
                if (!ng.isDefined(startDate) || 
                    !ng.isDefined(endDate) ||
                    !isDateValid(startDate) ||
                    !isDateValid(endDate)) {
                        alert("Invalid dates choosen!\nStart Date: " + startDate + "\nEnd Date: " + endDate);
                        return false;
                }
                return true;
            };

            var isDateValid = function(date) {
                $log.debug('ls-applicationController: date', date);
                $log.debug('ls-applicationController: format', configService.getDatePickerMomentFormat());
                return $moment(date, configService.getDatePickerMomentFormat(), true).isValid();
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
