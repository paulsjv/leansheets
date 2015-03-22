/**
 * Application-level dependencies go here.
 */
define([
    'jquery',
    'angular',
    'goog!visualization,1',
    'moment',
    'bootstrap',
    'modules/leansheets/ls-leansheetsApplication',
    'highcharts',
    'highchartsng'
], function($, ng ) {
    'use strict';

    var initInjector = angular.injector(['ng']),
        $http = initInjector.get('$http'),
        $log = initInjector.get('$log'),
        configFile = '/config.json';

    try {
        if (!window.jasmine) {
            fetchConfig().then(bootstrapApplication);
        }
    } catch (e) {
        // don't bootstrap more than once.
        console.log(e);
    }

    function fetchConfig() {
        $log.debug('fetchConfig');
        return $http.get(configFile).then(
                function (response) {
                    ng.module('config',[]).constant('CONFIG', response.data);
                }, function (error) {
                    alert('There was an error loading the configuration file!  Please reload page.');
                });
    }

    function bootstrapApplication() {
        $log.debug('bootstrapApplication');
        ng.module('google',[]).constant('$google', google);
        ng.module('moment',[]).constant('$moment', moment);
        ng.bootstrap(document, ['ls-leansheetsApplication']); 
    }
});
