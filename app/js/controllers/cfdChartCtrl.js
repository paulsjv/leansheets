'use strict';

angular.module('cfdChartCtrl', []).
  controller('CfdChartCtrl', ['$scope', 'DataService', '$window', function($scope, DataService, $window) {
  	var promiseDone = 0;
  	var startDates;
  	var endDates;

  	var cfdStartPromise = DataService.getCfdStartData('Feature');
  	cfdStartPromise.then(function (success) {
  		promiseDone++;
  		startDates = success;
  		handleSuccess();
  	}, function (error) {
  		alert(error);
  	});

  	var cfdEndPromise = DataService.getCfdEndData('Feature');
  	cfdEndPromise.then(function (success) {
  		promiseDone++;
  		endDates = success;
  		handleSuccess();
  	}, function (error) {
  		alert(error);
  	});

  	var handleSuccess = function () {
  		if (promiseDone == 2) {
  			var data = parseData(startDates, endDates);
  			var options = getOptionsForChart('Feature', data);
  			$scope.featureConfig = options;
  		}
  	}

	var getOptionsForChart = function (title, data) {
		return {
			options: {
				chart: {
					type: 'area'
				},
				xAxis: {
	              	title: {
	                	text: 'Dates'
	              	},
	            	categories: data.categories
	            },
	            yAxis: {
	            	title : {
	            		text: 'Stories'
	            	}
	            },
	            plotOptions: {
	                area: {
	                    stacking: 'normal',
	                    lineColor: '#666666',
	                    lineWidth: 1,
	                    marker: {
	                        lineWidth: 1,
	                        lineColor: '#666666'
	                    }
	                }
	            },
	            exporting: {
	            	sourceWidth: 600,
	            	sourceHeight: 400
			        
			    }
			},
			series: [{
				name: 'Backlog',
				data: data.backlogCount
			}, {
				name: 'WIP',
				data: data.wipCount
			},{
				name: 'Done',
				data: data.doneCount
			}],
			title: {
				text: title + ' CFD'
			}
		}
	};

	var parseData = function (startDatesCsv, endDatesCsv) {
		console.log(startDatesCsv);
		console.log(endDatesCsv);
		console.log($window);


		var data = {};
  		data.backlogCount = [];
  		data.wipCount = [];
  		data.doneCount = [];
  		data.categories = [];

  		var startDates = $scope.popLastIndexOfArrayIfEmpty(startDatesCsv.split("\n"));
  		var endDates = $scope.popLastIndexOfArrayIfEmpty(endDatesCsv.split("\n"));
	    
  		var j = 0;
  		var i = 0;
  		var x = 0;
  			
		while (i < startDates.length || j < endDates.length && x < 100) {
	  		var sDateArray = getDates(startDates[i]);
			var eDateArray = getDates(endDates[j]);

			var sTimestamp = getTimestamp(getDateFromArray(sDateArray));
			var eTimestamp = getTimestamp(getDateFromArray(eDateArray));

			if (x == 0) {
				data.backlogCount.push(parseInt(sDateArray[1]));
				// if sTimestamp and eTimestamp !=== NULL
				if (isStartDateEqEndDate(sTimestamp, eTimestamp)) {
					data.doneCount.push(parseInt(sDateArray[1]) + parseInt(eDateArray[1]));
					data.wipCount.push(parseInt(sDateArray[1]) - parseInt(eDateArray[1]));
					j++;
				} 
				// if eTimestamp === NULL
				else {
					data.doneCount.push(0);
					data.wipCount.push(parseInt(sDateArray[1]));
				}
				i++;
				x++;
				data.categories = addCategory(data.categories, sDateArray[0]);
			} else {
				// if sTimestamp and eTimestamp !== NULL
				if (isEndDateGtStartDate(sTimestamp, eTimestamp)) {
					data.backlogCount.push(data.backlogCount[x-1] + parseInt(sDateArray[1]));
					data.wipCount.push(data.wipCount[x-1] + parseInt(sDateArray[1]));
					data.doneCount.push(data.doneCount[x-1]);
					data.categories = addCategory(data.categories, sDateArray[0]);
					i++;
				} 
				// if sTimestamp and eTimestamp !== NULL && equal
				else if (isStartDateEqEndDate(sTimestamp, eTimestamp)) {
					data.backlogCount.push(data.backlogCount[x-1] + parseInt(sDateArray[1]));
					data.wipCount.push(data.wipCount[x-1] + parseInt(sDateArray[1] - parseInt(eDateArray[1])));
					data.doneCount.push(data.doneCount[x-1] + parseInt(eDateArray[1]));
					data.categories = addCategory(data.categories, sDateArray[0]);
					j++;
					i++;
				}
				// else if eTimestamp === NULL
				else if (eTimestamp === null && sTimestamp !== null) {
					data.backlogCount.push(data.backlogCount[x-1] + parseInt(sDateArray[1]));
					data.wipCount.push(data.wipCount[x-1] + parseInt(sDateArray[1]));
					data.doneCount.push(data.doneCount[x-1]);
					data.categories = addCategory(data.categories, sDateArray[0]);
					i++;
				}
				// else sTimestamp === NULL
				else if (eTimestamp !== null && sTimestamp === null) {
					data.backlogCount.push(data.backlogCount[x-1]);
					data.wipCount.push(data.wipCount[x-1] - parseInt(eDateArray[1]));
					data.doneCount.push(data.doneCount[x-1] + parseInt(eDateArray[1]));
					j++;
					data.categories = addCategory(data.categories, eDateArray[0]);
				}
				// else eTimestamp < sTimestamp
				else if (isEndDateLtStartDate(sTimestamp, eTimestamp)) {
					data.backlogCount.push(data.backlogCount[x-1]);
					data.wipCount.push(data.wipCount[x-1] - parseInt(eDateArray[1]));
					data.doneCount.push(data.doneCount[x-1] + parseInt(eDateArray[1]));
					j++;
					data.categories = addCategory(data.categories, eDateArray[0]);
				}
				x++;
			}
		}
		
  		console.log(data);
  		return data;
	};

	var addCategory = function (categories, date) {
		var dateTimestamp = getTimestamp(date);
		var lastDateTimestamp = getTimestamp(categories[categories.lastIndexOf()]);
		if (isNaN(lastDateTimestamp)) {
			categories.push(date);
		} else if (dateTimestamp > lastDateTimestamp) {
			categories.push(date);
		}
		return categories;
	};

	var isEndDateLtStartDate = function (start, end) {
		if ((isStartAndEndNotNull(start, end)) && end < start) {
			return true;
		}
		return false;
	};

	var isEndDateGtStartDate = function (start, end) {
		if ((isStartAndEndNotNull(start, end)) && end > start) {
			return true;
		}
		return false;
	};

	var isStartDateEqEndDate = function (start, end) {
		if ((isStartAndEndNotNull(start, end)) && (start == end)) {
			return true;
		} 
		return false;
	};

	var isStartAndEndNotNull = function (start, end) {
		if ((start !== null && end !== null)) {
			return true;
		} 
		return false;
	};

	var getDateFromArray = function (dates) {
		if (dates !== null && dates !== undefined) {
			return dates[0];
		}
		return null;
	};

	var getDates = function (dates) {
		if (dates !== null && dates !== undefined && dates != "") {
			var dateArray = dates.split("\",");
			dateArray[0] = getDateFromArray(dateArray).replace("\"","");
			return dateArray;
		}
		return null;
	};

	var getTimestamp = function (date) {
		if (date !== null) {
			return $window.Date.parse(date);
		}
		return null;
	};

	var processDates = function (i, j, data, startDateLine, endDateLine) {
		var sDateArray = startDateLine.split(",");
		var eDateArray = endDateLine.split(",");

		var sTimestamp = $window.Date.parse(sDateArray[0]);
		var eTimestamp = $window.Date.parse(eDateArray[0]);

		if (i == 0) {
			data.backlogCount.push()
		}
	};

	$scope.popLastIndexOfArrayIfEmpty = function (arry) {
      	if (arry[arry.length] == "" || arry[arry.length] == null) {
        	arry.pop();
	  	}
  		return arry;
	};

}]);