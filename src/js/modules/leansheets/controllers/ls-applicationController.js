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
    return ['$log', '$scope', 'ls-typeService','ls-chartService','ls-googleService', 
        function ($log, $scope, typeService, chartService, googleService) {

        $scope.helloWorld = 'Hello World';
        $scope.workType;
        $scope.workTypes;

        typeService.getWorkTypes().then(
            function(success) {
                $log.log('got work types!', success);
                $scope.workTypes = success;
                $scope.workType = $scope.workTypes[0].column != "" ? $scope.workTypes[0] : $scope.workTypes[1];
                $scope.getWorkType($scope.workType);
            }, function(error) {
                $log.log('error getting work types!', error);
            });

        /*
        googleService.getData({column: "F", name: "Backend"}).then(
            function(success) {
                $log.log('got data from google!', success);
            }, function(error) {
                $log.log('error getting data from google!', error);
            });
        */

         
        $scope.getWorkType = function(workType) {
                chartService.getHistogram(workType).then(
                        function(success) {
                            $scope.featureConfig = success;   
                            $log.debug('featureConfig: ', $scope.featureConfig);
                        });
            };

        //$scope.getWorkType($scope.workType);
        
    }];
});
