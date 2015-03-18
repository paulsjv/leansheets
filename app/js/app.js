'use strict';


// Declare app level module which depends on filters, and services
angular.module('leanSheetsApp', [
  'ngRoute',
  'controlChartCtrl',
  'histogramChartCtrl',
  'cfdChartCtrl',
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
    var now = moment("2014-06-11");
//    var now = moment("2014-04-14");
//  var d = moment.duration(30, 'days');
//    now.subtract(d);
  // Old CMS data
//   DataServiceConfigProvider.setUrl("https://docs.google.com/spreadsheet/ccc?key=0AqWHu14u074CdGc1WFVOU0l4V1Y2Z0xaSzEtUXQ4Nnc&usp=drive_web&sheet=out-CMS");
  // Old Display data
//   DataServiceConfigProvider.setUrl("https://docs.google.com/spreadsheet/ccc?key=0AqWHu14u074CdGc1WFVOU0l4V1Y2Z0xaSzEtUXQ4Nnc&usp=drive_web&sheet=Display");

  // DataServiceConfigProvider.setUrl("https://docs.google.com/a/comparemetrics.com/spreadsheet/ccc?key=0AsuzaPifn0kvdERsclpja0ZwSll2ZjJIV2VmYU5iZnc&usp=drive_web&sheet=Data");
   DataServiceConfigProvider.setUrl("https://docs.google.com/spreadsheet/ccc?key=0AqWHu14u074CdGc1WFVOU0l4V1Y2Z0xaSzEtUXQ4Nnc&usp=drive_web&sheet=Data");
    // DataServiceConfigProvider.setQuery("select D, E, A, B, C where D is not null AND toDate(D) < toDate(date '"+now.format('YYYY-MM-DD')+"') AND F = ");

    // Figure 1 - Legacy Work Items:
    // (standard work end date 2014-05-07 and end date 2014-06-11 and completed by new engineering team)
    DataServiceConfigProvider.setQuery("select D, E, A, B, C where D is not null AND toDate(D) < toDate(date '"+now.format('YYYY-MM-DD')+"') AND toDate(D) > toDate(date '2014-05-07') AND F = ");// AND toDate(D) < toDate(date '2014-06-18') ");
  // DataServiceConfigProvider.setCfdStartDateQuery("select C, count(A) where F = '%s' and C is not null group by C");
  // DataServiceConfigProvider.setCfdEndDateQuery("select D, count(A) where F = '%s' and D is not null group by D");
  DataServiceConfigProvider.setCfdStartDateQuery("select C, count(A) where F = '%s' and C is not null and toDate(C) > date '"+ now.format('YYYY-MM-YY') +"' group by C");
  DataServiceConfigProvider.setCfdEndDateQuery("select D, count(A) where F = '%s' and D is not null and toDate(C) > date '"+ now.format('YYYY-MM-YY') +"' group by D");

}]);
