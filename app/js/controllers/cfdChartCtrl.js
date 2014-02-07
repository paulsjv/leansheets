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

	var parseData = function (startDatesCsv, endDatesCsv) {

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
	  		var sDateArray = getDates(startDates[i]);
			var eDateArray = getDates(endDates[j]);

			var sTimestamp = getTimestamp(getDateFromArray(sDateArray));
			var eTimestamp = getTimestamp(getDateFromArray(eDateArray));

			var tomorrow = moment(sTimestamp).add('days', 1).unix() * 1000;//.calendar();
			var today = moment(sTimestamp).subtract('days', 1).unix() * 1000;
			var start = moment(sTimestamp).unix() * 1000;



			if (x == 0) {
				// data.backlogCount.push(parseInt(sDateArray[1]));
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
				data.categories = addCategory(data.categories, sDateArray[0]);
				i++;
				x++;				
			} else {
				// if sTimestamp and eTimestamp !== NULL 
				if (isEndDateGtStartDate(sTimestamp, eTimestamp) || (eTimestamp === null && sTimestamp !== null)) {
					x = addDatesBetweenCategories(data, x, sTimestamp);

					// data.backlogCount.push(data.backlogCount[x-1] + parseInt(sDateArray[1]));
					data.wipCount.push(data.wipCount[x-1] + parseInt(sDateArray[1]));
					data.doneCount.push(data.doneCount[x-1]);
					data.categories = addCategory(data.categories, sDateArray[0]);
					i++;
				}
				// else eTimestamp < sTimestamp 
				else if (isEndDateLtStartDate(sTimestamp, eTimestamp) || (eTimestamp !== null && sTimestamp === null)) {
					x = addDatesBetweenCategories(data, x, eTimestamp);
					
					// data.backlogCount.push(data.backlogCount[x-1]);
					data.wipCount.push(data.wipCount[x-1] - parseInt(eDateArray[1]));
					data.doneCount.push(data.doneCount[x-1] + parseInt(eDateArray[1]));
					j++;
					data.categories = addCategory(data.categories, eDateArray[0]);

				} 
				// if sTimestamp and eTimestamp !== NULL && equal
				else if (isStartDateEqEndDate(sTimestamp, eTimestamp)) {
					x = addDatesBetweenCategories(data, x, sTimestamp);

					// data.backlogCount.push(data.backlogCount[x-1] + parseInt(sDateArray[1]));
					data.wipCount.push(data.wipCount[x-1] + parseInt(sDateArray[1] - parseInt(eDateArray[1])));
					data.doneCount.push(data.doneCount[x-1] + parseInt(eDateArray[1]));
					data.categories = addCategory(data.categories, sDateArray[0]);
					j++;
					i++;
				}
				x++;
			}
		}
		
  		console.log(data);
  		return data;
	};

	var addDatesBetweenCategories = function (data, x, dateTimestamp) {
		// get last date in categories[x-1]?
		var catDate = data.categories[x-1];
		var catDateTimestamp = getTimestamp(catDate);
		var numDatesBetweenDates = moment.duration(dateTimestamp - catDateTimestamp).asDays();

		// loop through day between catDate and date adding to data.categories, doneCount, and wipCount
		for (var i=1; i < numDatesBetweenDates; i++) {
			var newDate = moment(getTimestamp(catDate)).add('days', i).format("MMM DD, YYYY");
			data.wipCount.push(data.wipCount[x-1]);
			data.doneCount.push(data.doneCount[x-1]);
			data.categories.push(newDate);
		}
		x = x + i - 1;
		return x;
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