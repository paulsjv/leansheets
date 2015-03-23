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
    './controllers/ls-histogramController',
    './controllers/ls-controlController',
    './controllers/ls-cfdController',
//    './directives/customDirective',
//    './factories/di-customFactory',
    './services/ls-googleConfigService',
    './services/ls-googleService',
    './services/ls-typeService',
    './services/ls-controlService',
    './services/ls-histogramService',
    './services/ls-cfdService'
], function (ng, 
        applicationController, histogramController, controlController, cfdController, 
        googleConfigService, googleService, typeService, controlService, histogramService, cfdService) {
    'use strict';

    // Define a new angular module. The given name should ALWAYS match the filename.
    var applicationModule = ng.module('ls-leansheetsApplication', ['config','google','moment','highcharts-ng']);
    applicationModule.config(['$logProvider','CONFIG', function($logProvider, config) {
            $logProvider.debugEnabled(config.debugEnabled);
        }]);

    // Add controllers to the module. The given name should ALWAYS match the filename.
    applicationModule.controller('ls-applicationController', applicationController);
    applicationModule.controller('ls-histogramController', histogramController);
    applicationModule.controller('ls-controlController', controlController);
    applicationModule.controller('ls-cfdController', cfdController);

    // Add directives to the module. The given name should ALWAYS match the filename.
    // applicationModule.directive('customDirective', customDirective);

    // Add factories to the module. The given name should ALWAYS match the filename.
    // applicationModule.factory('di-customFactory', customFactory);

    // Add services to the module. The given name should ALWAYS match the filename.
    applicationModule.service('ls-googleConfigService', googleConfigService);
    applicationModule.service('ls-googleService', googleService);
    applicationModule.service('ls-typeService', typeService);
    applicationModule.service('ls-controlService', controlService);
    applicationModule.service('ls-histogramService', histogramService);
    applicationModule.service('ls-cfdService', cfdService);
    
    return applicationModule;

});
