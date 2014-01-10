'use strict';

angular.module('controlChartCtrl', []).
  controller('ControlChartCtrl', ['$scope', 'GoogleService', function($scope, GoogleService) {
  	var directivePromise = GoogleService.getData('Feature', 'feature');
  	directivePromise.then(function (success){
  		$scope.chartConfig = getOptionsForChart('Feature', 'directive1', success);
  	}, function (error) {
  		alert(error);
  	});



  	var featuresPromise = GoogleService.getData('Feature', 'feature');
  	featuresPromise.then(function (success) {
  		// create charts here
  		var options = getOptionsForChart('Feature', 'feature', success);
  		var chart = new Highcharts.Chart(options);
  	}, function (error) {
  		alert(error);
  	});

  	var defectsPromise = GoogleService.getData('Defect', 'defect');
  	defectsPromise.then(function (success) {
  		// create charts here
  		$scope.sheetdata = success;
  		var options = getOptionsForChart('Defect', 'defect', success);
  		var chart = new Highcharts.Chart(options);
  	}, function (error) {
  		alert(error);
  	});

	var getOptionsForChart = function (title, div, data) {
		return {
		    chart: {
		      	renderTo: div,
		      	type: 'line'
		    },
		    title: {
		    	text: title + ' Control Chart'
		    },
		    xAxis: {
		      	title: {
		        	text: 'End Dates'
		      	},
		    	categories: data.endDates
		    },
		    yAxis: {
		      	title: {
		        	text: 'Lead Time'
		      	}
			    // ,
			    // plotLines: {
			    //   color: 'red',
			    //   label: {
			    //     text: 'Average Lead Time'
			    //   },
			    //   value: data.avgLeadTime
			    // }
		    	},
		    	series: [{
		      		name: 'Lead Time',
		      		data: data.leadTimes
		    		}]

		  		};
			} 


	}]);