/**
 * The root of the module directory should only include only the angular module definition.
 *
 * Naming Convention:
 *
 * 1. Always include `di-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always match the filename with the module folder name.
 *
 * i.e. di-application.js
 */
define([
    'angular',
    './controllers/di-applicationController',
    './directives/customDirective',
    './factories/di-customFactory',
    './services/di-customService'
], function (ng, applicationController, customDirective, customFactory, customService) {
    'use strict';

    // Define a new angular module. The given name should ALWAYS match the filename.
    var applicationModule = ng.module('di-application', []);

    // Add controllers to the module. The given name should ALWAYS match the filename.
    applicationModule.controller('di-applicationController', applicationController);

    // Add directives to the module. The given name should ALWAYS match the filename.
    applicationModule.directive('customDirective', customDirective);

    // Add factories to the module. The given name should ALWAYS match the filename.
    applicationModule.factory('di-customFactory', customFactory);

    // Add services to the module. The given name should ALWAYS match the filename.
    applicationModule.service('di-customService', customService);

    return applicationModule;

});
