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
    './controllers/ls-downloadController',
    './services/ls-configService',
    // './services/data-sources/google/ls-googleService',
    // './services/data-sources/google/ls-typeService',
    './services/ls-controlService',
    './services/ls-histogramService',
    './services/ls-cfdService',
    './services/ls-downloadService',
    // './services/data-sources/google/ls-queryService',
    './services/ls-cacheService',
    './services/data-sources/ls-dataSourceService',
    './services/data-sources/jira/ls-issueService',
    './services/data-sources/jira/ls-jiraService',
    './services/data-sources/jira/ls-issuesDownloadService',
    './services/data-sources/jira/sprints/ls-sprintBoundariesService',
    './services/data-sources/jira/sprints/ls-sprintIssuesService',
    './services/data-sources/jira/ls-jiraQueryService',
    './services/data-sources/jira/ls-projectService',
    './services/ls-loadingStatusService',
    './directives/datePickerDirective'
], function (ng,
        applicationController, histogramController, controlController, cfdController, downloadController,
        configService, /*googleService, typeService,*/ controlService, histogramService, cfdService, downloadService, /*queryService,*/ cacheService,
        dataSourceService, issueService, jiraService, issuesDownloadService, sprintBoundariesService, sprintIssuesService, jiraQueryService,
        projectService, loadingStatusService, datePickerDirective) {
    'use strict';

    // Define a new angular module. The given name should ALWAYS match the filename.
    var applicationModule = ng.module('ls-leansheetsApplication', ['config',/*'google',*/'moment','highcharts-ng','jssha','unionBy']);
    applicationModule.config(['$logProvider','CONFIG','$moment','$compileProvider', function($logProvider, config, $moment, $compileProvider) {
            $logProvider.debugEnabled(config.debugEnabled);
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
            $moment.updateLocale('us',
                { 
                    workingWeekdays: config.weekdays,
                    holidays: config.holidays,
                    holidayFormat: config.holidaysFormat
                });
        }]);

    // Add controllers to the module. The given name should ALWAYS match the filename.
    applicationModule.controller('ls-applicationController', applicationController);
    applicationModule.controller('ls-histogramController', histogramController);
    applicationModule.controller('ls-controlController', controlController);
    applicationModule.controller('ls-cfdController', cfdController);
    applicationModule.controller('ls-downloadController', downloadController);

    // Add services to the module. The given name should ALWAYS match the filename.
    applicationModule.service('ls-configService', configService);
    // applicationModule.service('ls-googleService', googleService);
    // applicationModule.service('ls-typeService', typeService);
    applicationModule.service('ls-controlService', controlService);
    applicationModule.service('ls-histogramService', histogramService);
    applicationModule.service('ls-cfdService', cfdService);
    applicationModule.service('ls-downloadService', downloadService);
    applicationModule.service('ls-issuesDownloadService', issuesDownloadService);
    // applicationModule.service('ls-queryService', queryService);
    applicationModule.service('ls-cacheService', cacheService);
    applicationModule.service('ls-issueService', issueService);
    applicationModule.service('ls-jiraService', jiraService);
    applicationModule.service('ls-sprintIssuesService', sprintIssuesService);
    applicationModule.service('ls-sprintBoundariesService', sprintBoundariesService);
    applicationModule.service('ls-jiraQueryService', jiraQueryService);
    applicationModule.service('ls-dataSourceService', dataSourceService);
    applicationModule.service('ls-projectService', projectService);

    // Add directives to the module. The given name should ALWAYS match the filename.
    applicationModule.service('ls-loadingStatusService', loadingStatusService);
    applicationModule.directive('datePickerDirective', datePickerDirective);

    return applicationModule;

});
