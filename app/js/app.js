'use strict';


// Declare app level module which depends on filters, and services
angular.module('leanSheetsApp', [
  'ngRoute',
  'controlChartCtrl'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/controlChart.html', controller: 'ControlChartCtrl'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
