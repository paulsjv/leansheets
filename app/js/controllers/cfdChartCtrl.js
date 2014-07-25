'use strict';

angular.module('cfdChartCtrl', []).
  controller('CfdChartCtrl', ['$scope', 'DataService', '$window', function($scope, DataService, $window) {
  	var promiseDone = 0;
  	var startDates;
  	var endDates;

  	// $scope.workTypes = ["Display","Defect","CMS","Platform","Expedite"];
  	$scope.workTypes = ["Standard","Intangable","Fixed Date","Expedite","Engineering Support"];
  	$scope.workType = $scope.workTypes[0];

	$scope.getWorkType = function(workType) {
		var cfdStartPromise = DataService.getCfdStartData(workType);
	  	cfdStartPromise.then(function (success) {
	  		promiseDone++;
	  		startDates = success;
	  		handleSuccess();
	  	}, function (error) {
	  		alert(error);
	  	});

	  	var cfdEndPromise = DataService.getCfdEndData(workType);
	  	cfdEndPromise.then(function (success) {
	  		promiseDone++;
	  		endDates = success;
	  		handleSuccess();
	  	}, function (error) {
	  		alert(error);
	  	});
  	};

  	$scope.getWorkType($scope.workType);

  	var handleSuccess = function () {
  		if (promiseDone == 2) {
  			var data = $scope.parseData(startDates, endDates);
  			var options = getOptionsForChart($scope.workType, data);
  			$scope.featureConfig = options;
  			promiseDone = 0;
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
	            	sourceWidth: 1600,
	            	sourceHeight: 1200
			        
			    }
			},
			series: [
			// {
			// 	name: 'Backlog',
			// 	data: data.backlog
			// }, 
			{
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

	$scope.parseData = function (startDatesCsv, endDatesCsv) {
		console.log("in parseData");
		var data = {};
  		// data.backlogCount = [];
  		data.wipCount = [];
  		data.doneCount = [];
  		data.categories = [];


  		var startDates = $scope.popLastIndexOfArrayIfEmpty(startDatesCsv.split("\n"));
  		var endDates = $scope.popLastIndexOfArrayIfEmpty(endDatesCsv.split("\n"));
	    
  		var j = 0;
  		var i = 0;
  		var x = 0;
  			
		while (i < startDates.length || j < endDates.length) {
	  		var sDateArray = $scope.getDates(startDates[i]);
			var eDateArray = $scope.getDates(endDates[j]);

			var sTimestamp = $scope.getTimestamp($scope.getDateFromArray(sDateArray));
			var eTimestamp = $scope.getTimestamp($scope.getDateFromArray(eDateArray));

			var tomorrow = moment(sTimestamp).add('days', 1).unix() * 1000;//.calendar();
			var today = moment(sTimestamp).subtract('days', 1).unix() * 1000;
			var start = moment(sTimestamp).unix() * 1000;



			if (x == 0) {
				// data.backlogCount.push(parseInt(sDateArray[1]));
				// if sTimestamp and eTimestamp !=== NULL
				if ($scope.isStartDateEqEndDate(sTimestamp, eTimestamp)) {
					data.doneCount.push(parseInt(sDateArray[1]) + parseInt(eDateArray[1]));
					data.wipCount.push(parseInt(sDateArray[1]) - parseInt(eDateArray[1]));
					j++;
				} 
				// if eTimestamp === NULL
				else {
					data.doneCount.push(0);
					data.wipCount.push(parseInt(sDateArray[1]));
				}
				data.categories = $scope.addCategory(data.categories, sDateArray[0]);
				i++;
				x++;				
			} else {
				// if sTimestamp and eTimestamp !== NULL 
				if ($scope.isEndDateGtStartDate(sTimestamp, eTimestamp) || (eTimestamp === null && sTimestamp !== null)) {
					x = $scope.addDatesBetweenCategories(data, x, sTimestamp);

					// data.backlogCount.push(data.backlogCount[x-1] + parseInt(sDateArray[1]));
					data.wipCount.push(data.wipCount[x-1] + parseInt(sDateArray[1]));
					data.doneCount.push(data.doneCount[x-1]);
					data.categories = $scope.addCategory(data.categories, sDateArray[0]);
					i++;
				}
				// else eTimestamp < sTimestamp 
				else if ($scope.isEndDateLtStartDate(sTimestamp, eTimestamp) || (eTimestamp !== null && sTimestamp === null)) {
					x = $scope.addDatesBetweenCategories(data, x, eTimestamp);
					
					// data.backlogCount.push(data.backlogCount[x-1]);
					data.wipCount.push(data.wipCount[x-1] - parseInt(eDateArray[1]));
					data.doneCount.push(data.doneCount[x-1] + parseInt(eDateArray[1]));
					j++;
					data.categories = $scope.addCategory(data.categories, eDateArray[0]);

				} 
				// if sTimestamp and eTimestamp !== NULL && equal
				else if ($scope.isStartDateEqEndDate(sTimestamp, eTimestamp)) {
					x = $scope.addDatesBetweenCategories(data, x, sTimestamp);

					// data.backlogCount.push(data.backlogCount[x-1] + parseInt(sDateArray[1]));
					data.wipCount.push(data.wipCount[x-1] + parseInt(sDateArray[1] - parseInt(eDateArray[1])));
					data.doneCount.push(data.doneCount[x-1] + parseInt(eDateArray[1]));
					data.categories = $scope.addCategory(data.categories, sDateArray[0]);
					j++;
					i++;
				}
				x++; // do we need to be adding one to x?  should this be the length of the category?
			}
		}

  		return data;
	};

	$scope.addDatesBetweenCategories = function (data, x, dateTimestamp) {
		// get last date in categories[x-1]?
		var catDate = data.categories[x-1];
		var catDateTimestamp = $scope.getTimestamp(catDate);
		var numDatesBetweenDates = moment.duration(dateTimestamp - catDateTimestamp).asDays();

		// loop through day between catDate and date adding to data.categories, doneCount, and wipCount
		for (var i=1; i < numDatesBetweenDates; i++) {
			var newDate = moment($scope.getTimestamp(catDate)).add('days', i).format("MMM DD, YYYY");
			data.wipCount.push(data.wipCount[x-1]);
			data.doneCount.push(data.doneCount[x-1]);
			data.categories.push(newDate);
		}
		x = x + i - 1;
		return x;
	};

	$scope.addCategory = function (categories, date) {
		var dateTimestamp = $scope.getTimestamp(date);
		var lastDateTimestamp = $scope.getTimestamp(categories[categories.length-1]);
		if (isNaN(lastDateTimestamp)) {
			categories.push(date);
		} else if (dateTimestamp > lastDateTimestamp) {
			categories.push(date);
		}
		return categories;
	};

	$scope.isEndDateLtStartDate = function (start, end) {
		if (($scope.isStartAndEndNotNull(start, end)) && end < start) {
			return true;
		}
		return false;
	};

	$scope.isEndDateGtStartDate = function (start, end) {
		if (($scope.isStartAndEndNotNull(start, end)) && end > start) {
			return true;
		}
		return false;
	};

	$scope.isStartDateEqEndDate = function (start, end) {
		if (($scope.isStartAndEndNotNull(start, end)) && (start == end)) {
			return true;
		} 
		return false;
	};

	$scope.isStartAndEndNotNull = function (start, end) {
		if (($scope.nullEmptyOrUndefined(start) !== null && 
			$scope.nullEmptyOrUndefined(end) !== null)) {
			return true;
		} 
		return false;
	};

	$scope.nullEmptyOrUndefined = function(toNull) {
		if (toNull === "" || toNull === undefined) {
			return null;
		}
		return toNull;
	};

	$scope.getDateFromArray = function (dates) {
		if (dates !== null && dates !== undefined && dates !== "") {
			return dates[0];
		}
		return null;
	};

	$scope.getDates = function (dates) {
		if (dates !== null && dates !== undefined && dates != "") {
			var dateArray = dates.split("\",");
			dateArray[0] = $scope.getDateFromArray(dateArray).replace("\"","");
			return dateArray;
		}
		return null;
	};

	$scope.getTimestamp = function (date) {
		if (date !== null && date !== "" && date !== undefined) {
			return $window.Date.parse(date);
		}
		return null;
	};

	$scope.popLastIndexOfArrayIfEmpty = function (arry) {
      	if (arry[arry.length] == "" || arry[arry.length] == null) {
        	arry.pop();
	  	}
  		return arry;
	};

}]);