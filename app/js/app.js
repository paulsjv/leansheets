'use strict';


// Declare app level module which depends on filters, and services
angular.module('leanSheetsApp', [
  'ngRoute',
  'controlChartCtrl',
  'histogramChartCtrl',
  'dataService',
  'dataServiceConfig',
  'highcharts-ng'
]).
config(['$routeProvider','DataServiceConfigProvider', function($routeProvider, DataServiceConfigProvider) {
  $routeProvider.when('/charts', {templateUrl: 'partials/charts.html'});
  $routeProvider.otherwise({redirectTo: '/charts'});

  DataServiceConfigProvider.setUrl("https://docs.google.com/spreadsheet/ccc?key=0AqWHu14u074CdExaZ21PMDNtdVJQbHJncWk3c1c2SlE&usp=drive_web&sheet=Data");
  DataServiceConfigProvider.setQuery("select D, E, A, B where D is not null AND F = ");
}]);
