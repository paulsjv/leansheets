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

        this.getChart = function (workTypes) {
            var deferred = $q.defer(),
                promise = deferred.promise,
                directivePromise = googleService.getData(workTypes);

            directivePromise.then(
                function (success){
                    $log.debug('Got the data for the histogram!');
      	            deferred.resolve(getOptionsForChart('', parseData(success)));
                }, function (error) {
                    $log.error('HistogramService: Error getting data for histogram! ');
                    deferred.reject(error);
                });
            return promise;
        };

        var getOptionsForChart = function (title, data) {
		    return {
                options: {
			        chart: {
                        zoomType: 'xy'
                    },
                    xAxis: {
                      	title: {
                          	text: 'Lead Times'
                  	    },
                      	categories: data.categories
                    },
                    yAxis: [{
                        min: 0,
                        title: {
                            text: 'Percentage of Total'
                        },
                        labels: {
                            formatter: function() {
                                return this.value + '%'
                            }
                        },
                        opposite: true
                    },{
                        gridLineWidth: 0,
                        title: {
                            text: 'Frequency'
                        },
                        opposite: false
                    }],
                    exporting: {
                        sourceWidth: 1600,
                        sourceHeight: 1200
                    }
      		    },
      	    	series: [{
                    name: 'Frequency',
                    data: data.frequency,
                    yAxis: 1,
                    type: 'column'
   	    		},{
                    name: 'Percentage of Total',
                    data: data.percentOfTotal,
                    type: 'spline',
                    tooltip: {
                        valueSuffix: '%'
                    }
                }],
      		    title: {
	    	        text: title + ' Histogram'
                }
        	}
        };

       var parseData = function (csv) {
            // key of data array is the lead time
            // value of data array is the number of times lead time shows in data set
            var data = new Array();
            var obj = {
                categories: new Array(),
                frequency: new Array(),
                percentOfTotal: new Array()
            };

            var lines = csv.split("\n");
            lines = popLastIndexOfArrayIfEmpty(lines);
            var total = 0;

            for (var i in lines) {
                var line = lines[i].split(",");
                if (!data[line[1]]) {
                    data[line[1]] = 1;
                } else {
                    data[line[1]]++;
                }
                total = total +1;
            }

            var cumTotal = 0;
            $.each(data, function(key, value) {
                if (value !== undefined && value !== null && value != "") {
                    obj.categories.push(key);
                    obj.frequency.push(value);
                    cumTotal = cumTotal + value;
                    obj.percentOfTotal.push($window.Math.round((cumTotal/total) * 100));
                }
            });

            return obj;
        };

      	var popLastIndexOfArrayIfEmpty = function (arry) {
            	if (arry[arry.length] == "" || arry[arry.length] == null) {
              	arry.pop();
  	  	    }
        		return arry;
     	};
    }];
});
