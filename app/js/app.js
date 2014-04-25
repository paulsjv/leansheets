'use strict';


// Declare app level module which depends on filters, and services
angular.module('leanSheetsApp', [
  'ngRoute',
  'controlChartCtrl',
  'histogramChartCtrl',
  'cfdChartCtrl',
  'dataService',
  'dataServiceConfig',
  'highcharts-ng'
]).
config(['$routeProvider','DataServiceConfigProvider', function($routeProvider, DataServiceConfigProvider) {
  $routeProvider.when('/charts', {templateUrl: 'partials/charts.html'});
  $routeProvider.otherwise({redirectTo: '/charts'});

  // Old CMS data
  // DataServiceConfigProvider.setUrl("https://docs.google.com/a/comparemetrics.com/spreadsheet/ccc?key=0AsuzaPifn0kvdERsclpja0ZwSll2ZjJIV2VmYU5iZnc&usp=drive_web&sheet=out-CMS");
  // Old Display data
  // DataServiceConfigProvider.setUrl("https://docs.google.com/a/comparemetrics.com/spreadsheet/ccc?key=0AsuzaPifn0kvdERsclpja0ZwSll2ZjJIV2VmYU5iZnc&usp=drive_web&sheet=Display");
  DataServiceConfigProvider.setUrl("https://docs.google.com/a/comparemetrics.com/spreadsheet/ccc?key=0AsuzaPifn0kvdERsclpja0ZwSll2ZjJIV2VmYU5iZnc&usp=drive_web&sheet=Data");
  DataServiceConfigProvider.setQuery("select D, E, A, B where D is not null AND F = ");
  DataServiceConfigProvider.setCfdStartDateQuery("select C, count(A) where F = '%s' and C is not null group by C");
  DataServiceConfigProvider.setCfdEndDateQuery("select D, count(A) where F = '%s' and D is not null group by D");

}]);
