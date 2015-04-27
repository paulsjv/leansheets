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
    './services/ls-configService',
    './services/ls-googleService',
    './services/ls-typeService',
    './services/ls-controlService',
    './services/ls-histogramService',
    './services/ls-cfdService',
    './services/ls-queryService',
    './services/ls-cacheService',
    './directives/datePickerDirective'
], function (ng,
        applicationController, histogramController, controlController, cfdController,
        configService, googleService, typeService, controlService, histogramService, cfdService, queryService, cacheService,
        datePickerDirective) {
    'use strict';

    // Define a new angular module. The given name should ALWAYS match the filename.
    var applicationModule = ng.module('ls-leansheetsApplication', ['config','google','moment','highcharts-ng','jssha']);
    applicationModule.config(['$logProvider','CONFIG', function($logProvider, config) {
            $logProvider.debugEnabled(config.debugEnabled);
        }]);

    // Add controllers to the module. The given name should ALWAYS match the filename.
    applicationModule.controller('ls-applicationController', applicationController);
    applicationModule.controller('ls-histogramController', histogramController);
    applicationModule.controller('ls-controlController', controlController);
    applicationModule.controller('ls-cfdController', cfdController);

    // Add services to the module. The given name should ALWAYS match the filename.
    applicationModule.service('ls-configService', configService);
    applicationModule.service('ls-googleService', googleService);
    applicationModule.service('ls-typeService', typeService);
    applicationModule.service('ls-controlService', controlService);
    applicationModule.service('ls-histogramService', histogramService);
    applicationModule.service('ls-cfdService', cfdService);
    applicationModule.service('ls-queryService', queryService);
    applicationModule.service('ls-cacheService', cacheService)

    // Add directives to the module. The given name should ALWAYS match the filename.
    applicationModule.directive('datePickerDirective', datePickerDirective);

    return applicationModule;

});
