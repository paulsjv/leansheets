/**
 * The services/ directory should only include angular service definitions.
 *
 * Naming Convention:
 *
 * 1. Always include `ls-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always include `Service` suffix
 *
 * i.e. ls-googleConfigService.js
 */
define(['angular'], function (ng) {
    'use strict';

    return ['$log','$q','$window','ls-googleService', function ($log, $q, $window, googleService) {
		var sheet = null;
		
		this.setDataSource = function(sheetKey) {
			sheet = sheetKey;
		}
		
		this.getChart = function (workTypes) {
           var startDatePromise = googleService.getCfdStartData(workTypes),
                endDatePromise = googleService.getCfdEndData(workTypes),
                deferred = $q.defer(),
                promise = deferred.promise;

            $q.all([startDatePromise, endDatePromise]).then(
                    function(data) {
                        $log.debug('Got the data for the CFD: ls-cfdService!')
                        deferred.resolve(getOptionsForChart('', parseData(data[0], data[1])));
                    }, function(error) {
                        $log.error('ls-cfdService: Error getting data for CFD!');
                        deferred.reject(error);
                    });

            return promise;
        };

      	var handleResponse = function (error) {
  		    if (promiseDone == 2) {
  	    		var data = parseData(startDates, endDates);
      			var options = getOptionsForChart('', data);
  			    config = options;
  		    	promiseDone = 0;
                deferred.resolve(config);
  	    	} else if (errorDone > 0) {
                errorDone = 0;
                deferred.reject(error);
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
		    //console.log("in parseData");
	    	var data = {};
      		// data.backlogCount = [];
  		    data.wipCount = [];
  	    	data.doneCount = [];
      		data.categories = [];

  		    var startDates = popLastIndexOfArrayIfEmpty(startDatesCsv.split("\n"));
  	    	var endDates = popLastIndexOfArrayIfEmpty(endDatesCsv.split("\n"));

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
		    		x++; // do we need to be adding one to x?  should this be the length of the category?
	    		}
    		}

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
    		var lastDateTimestamp = getTimestamp(categories[categories.length-1]);
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
    		if ((nullEmptyOrUndefined(start) !== null &&
	    		nullEmptyOrUndefined(end) !== null)) {
		    	return true;
    		}
		    return false;
	    };

    	var nullEmptyOrUndefined = function(toNull) {
		    if (toNull === "" || toNull === undefined) {
	    		return null;
    		}
		    return toNull;
	    };

    	var getDateFromArray = function (dates) {
		    if (dates !== null && dates !== undefined && dates !== "") {
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
    		if (date !== null && date !== "" && date !== undefined) {
			    return $window.Date.parse(date);
		    }
	    	return null;
    	};

	    var popLastIndexOfArrayIfEmpty = function (arry) {
          	if (arry[arry.length] == "" || arry[arry.length] == null) {
        	    arry.pop();
	  	    }
  	    	return arry;
    	};
    }];
});
