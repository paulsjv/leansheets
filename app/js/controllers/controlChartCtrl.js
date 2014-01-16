'use strict';

angular.module('controlChartCtrl', []).
  controller('ControlChartCtrl', ['$scope', 'DataService', function($scope, DataService) {
  	var directivePromise = DataService.getData('Feature');
  	directivePromise.then(function (success){
  		$scope.featureConfig = getOptionsForChart('Feature', parseData(success));
  	}, function (error) {
  		alert(error);
  	});

  	var defectsPromise = DataService.getData('Defect');
  	defectsPromise.then(function (success) {
  		$scope.defectConfig = getOptionsForChart('Defect', parseData(success));
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

	var parseData = function (csv) {
		var data = {};
  		data.endDates = [];
  		data.leadTimes = [];

  		var lines = csv.split("\n");
  		lines = popLastIndexOfArrayIfEmpty(lines);

  		var str = "";
  		for (var i in lines) {
    		var line = lines[i].split(",");
    		var obj = {};
    		obj.y = parseInt(line[1]);
    		obj.name = line[2] + ' - ' + line[3];
    		data.endDates.push(line[0]);
    		data.leadTimes.push(obj);
  		}
  		return data;
	};

	var popLastIndexOfArrayIfEmpty = function (arry) {
      	if (arry[arry.length] == "" || arry[arry.length] == null) {
        	arry.pop();
	  	}
  		return arry;
	};

}]);