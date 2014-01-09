'use strict';


// Declare app level module which depends on filters, and services
angular.module('leanSheetsApp', [
  'ngRoute',
  'controlChartCtrl',
  'googleService',
  'googleConfig',
  'highcharts'
]).
config(['$routeProvider','GoogleConfigProvider', function($routeProvider, GoogleConfigProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/controlChart.html', controller: 'ControlChartCtrl'});
  $routeProvider.otherwise({redirectTo: '/view1'});

  GoogleConfigProvider.setUrl("https://docs.google.com/spreadsheet/ccc?key=0AqWHu14u074CdExaZ21PMDNtdVJQbHJncWk3c1c2SlE&usp=drive_web&sheet=Data");
  GoogleConfigProvider.setQuery("select D, E, A, B where D is not null AND F = ");
}]);
