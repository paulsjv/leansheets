/**
 * The root of the module directory should only include only the angular module definition.
 *
 * Naming Convention:
 *
 * 1. Always include `ls-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always match the filename with the module folder name.
 *
 * i.e. di-application.js
 */
define([
    'angular',
    './controllers/ls-applicationController',
//    './directives/customDirective',
//    './factories/di-customFactory',
    './services/ls-googleConfigService',
    './services/ls-googleService',
    './services/ls-typeService',
    './services/ls-chartService',
    './services/ls-histogramService'
], function (ng, applicationController, googleConfigService, googleService, typeService, chartService, histogramService) {
    'use strict';

    // Define a new angular module. The given name should ALWAYS match the filename.
    var applicationModule = ng.module('ls-leansheetsApplication', ['config','google','moment','highcharts-ng']);
    applicationModule.config(['$logProvider','CONFIG', function($logProvider, config) {
            $logProvider.debugEnabled(config.debugEnabled);
        }]);

    // Add controllers to the module. The given name should ALWAYS match the filename.
    applicationModule.controller('ls-applicationController', applicationController);

    // Add directives to the module. The given name should ALWAYS match the filename.
    // applicationModule.directive('customDirective', customDirective);

    // Add factories to the module. The given name should ALWAYS match the filename.
    // applicationModule.factory('di-customFactory', customFactory);

    // Add services to the module. The given name should ALWAYS match the filename.
    applicationModule.service('ls-googleConfigService', googleConfigService);
    applicationModule.service('ls-googleService', googleService);
    applicationModule.service('ls-typeService', typeService);
    applicationModule.service('ls-chartService', chartService);
    applicationModule.service('ls-histogramService', histogramService);
    
    return applicationModule;

});
