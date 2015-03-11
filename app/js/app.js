'use strict';


// Declare app level module which depends on filters, and services
angular.module('leanSheetsApp', [
  'ngRoute',
  'controlChartCtrl',
  'histogramChartCtrl',
  'cfdChartCtrl',
  'typesService',
  'dataService',
  'dataServiceConfig',
  'highcharts-ng',
  'd3controlChartCtrl',
  'nvd3ChartDirectives'
]).
config(['$routeProvider','DataServiceConfigProvider', function($routeProvider, DataServiceConfigProvider) {
  $routeProvider.when('/charts', {templateUrl: 'partials/charts.html'});
  $routeProvider.otherwise({redirectTo: '/charts'});

//  var now = moment("2014-07-02");
	var now = moment();
    var d = moment.duration(180, 'days');
    now.subtract(d);

    DataServiceConfigProvider.setConfigUrl("https://docs.google.com/a/drillinginfo.com/spreadsheet/ccc?key=0AonIdzD-Ya1EdHdlRWNXcmVrMlRGRlZ4bXVwb1B5T2c&usp=drive_web&gid=5#");
	DataServiceConfigProvider.setUrl("https://docs.google.com/a/drillinginfo.com/spreadsheet/ccc?key=0AonIdzD-Ya1EdHdlRWNXcmVrMlRGRlZ4bXVwb1B5T2c&gid=2&usp=drive_web#");

  DataServiceConfigProvider.setConfigQuery("select *");
  DataServiceConfigProvider.setQuery("select D, E, A, B, C where D is not null AND toDate(D) > toDate(date '"+now.format('YYYY-MM-DD')+"') "); // AND F = ");
  DataServiceConfigProvider.setCfdStartDateQuery("select C, count(A) where %s and C is not null and toDate(C) > date '"+ now.format('YYYY-MM-YY') +"' group by C");
  DataServiceConfigProvider.setCfdEndDateQuery("select D, count(A) where %s and D is not null and toDate(C) > date '"+ now.format('YYYY-MM-YY') +"' group by D");

}]);
