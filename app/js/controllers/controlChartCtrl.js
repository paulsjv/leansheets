'use strict';

angular.module('controlChartCtrl', []).
  controller('ControlChartCtrl', ['$scope', 'GoogleService', function($scope, GoogleService) {
  	var data = GoogleService.getData('Feature', 'feature');
  	$scope.helloworld = "hello world!";
  	data.then(function (success) {
  		$scope.sheetdata = success;
  	}, function (error) {
  		$scope.sheetdata = error;
  	});
  	console.log(GoogleService.getUrl());
  	console.log(GoogleService.getData('Feature', 'feature'));
  	console.log($scope.sheetdata);
  }]);