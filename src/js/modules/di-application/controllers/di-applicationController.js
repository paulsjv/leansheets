/**
 * The controllers/ directory should only include view-level angular controller definitions.
 * This DOES NOT INCLUDE controllers for use in directives. Keep those inside the directive definition.
 *
 * Naming Convention:
 *
 * 1. Always include `di-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always include `Controller` suffix
 *
 * i.e. di-applicationController.js
 */
define(['angular'], function (ng) {
    'use strict';

    /**
     * Returns angular "array-syntax" controller definition.
     *
     * Parameter options include all standard angular services, plus any provided by
     * module-level dependencies.
     */
    return ['$log', '$scope', 'di-customService', 'di-customFactory', function ($log, $scope, customService, customFactory) {

        $scope.helloWorld = 'Hello World';
        $scope.serviceHello = customService.helloWorld();
        $scope.factorySupportHello = customFactory.createSupportClass().sayHello();

    }];

});
