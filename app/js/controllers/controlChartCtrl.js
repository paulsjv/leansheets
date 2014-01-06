'use strict';

angular.module('controlChartCtrl', []).
  controller('ControlChartCtrl', ['$scope', 'GoogleService', function($scope, GoogleService) {
  	$scope.helloworld = "hello world!";
  	console.log(GoogleService.getUrl());
  }]);