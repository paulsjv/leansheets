'use strict';

angular.module('controlChartCtrl', []).
  controller('ControlChartCtrl', ['$scope', 'GoogleService', function($scope, GoogleService) {
  	console.log('scope.type ' + $scope.type);
  	var directivePromise = GoogleService.getData('Feature');
  	directivePromise.then(function (success){
  		$scope.featureConfig = getOptionsForChart('Feature', success);
  	}, function (error) {
  		alert(error);
  	});

  	var defectsPromise = GoogleService.getData('Defect');
  	defectsPromise.then(function (success) {
  		$scope.defectConfig = getOptionsForChart('Defect', success);
  	}, function (error) {
  		alert(error);
  	});

	var getOptionsForChart = function (title, data) {
		return {
			options: {
				chart: {
					type: 'line'
				},
				xAxis: {
	              	title: {
	                	text: 'End Dates'
	              	},
	            	categories: data.endDates
	            }
			},
			series: [{
				name: 'Lead Time',
				data: data.leadTimes
			}],
			title: {
				text: title + ' Control Chart'
			}
		}
	};

}]);