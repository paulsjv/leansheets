/**
 * Application-level dependencies go here.
 */
define([
    'jquery',
    'angular',
    'goog!visualization,1',
    'bootstrap',
    'modules/di-application/di-application'
], function($, ng) {
    'use strict';
    // angular.bootstrap(document, ['leanSheetsApp']);
    try {
        if (!window.jasmine) {
            ng.bootstrap(document, ['di-application']);
        }
    } catch (e) {
        // don't bootstrap more than once.
        console.log(e);
    }
});
