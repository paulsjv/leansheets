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

    return ['$log','$q','$window','ls-dataSourceService', function ($log, $q, $window, dataSourceService) {

		var sheet = null;
		
		this.setDataSource = function(sheetKey) {
			sheet = sheetKey;
		}

        this.getChart = function (workType) {
            var deferred = $q.defer(),
                promise = deferred.promise,
                directivePromise = dataSourceService.getDataSourceService(sheet).getData(workType);

            directivePromise.then(
                function (success){
                    $log.debug('Got the data for the control chart: ls-controlService!');
      	            deferred.resolve(getOptionsForChart('', parseData(success)));
                }, function (error) {
                    $log.error('ls-controlService: Error getting data for control chart!');
                    deferred.reject(error);
                });
            return promise;
        };

    	var getOptionsForChart = function (title, data) {
	    	return {
		    	options: {
			    	chart: {
				    	type: 'line'
    				},
	    			xAxis: {
	                  	title: {
	                    	text: 'Stories'
	                  	},
	            	    categories: data.endDates
    	            },
	                yAxis: {
	                	title : {
	                		text: 'Lead Time'
	                	},
	            	    plotLines: [{
		              	    	color: 'red',
		              		    value: data.leadTimeStDevation.mean,
    		              		width: 2,
	    	              		label: { text: 'Average Lead Time - ' + data.leadTimeStDevation.mean }
	                  		},
	                  		{
		                  		color: 'green',
		                  		value: data.leadTimeStDevation.high,
		              	    	width: 2,
		              		    label: { text: 'Upper Control Limit - ' + data.leadTimeStDevation.high }
    	              		},
	                  		{
		                  		color: 'green',
		                  		value: data.leadTimeStDevation.low,
		                  		width: 2,
		                  		label : { text: 'Lower Control Limit - ' + data.leadTimeStDevation.low }
	              		    }]
    	            },
	                exporting: {
	                	sourceWidth: 1600,
	                	sourceHeight: 1200
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

    	var average = function(a) {
	    	var r = {mean: 0, variance: 0, deviation: 0, high: 0, low: 0}, t = a.length;
		    for(var m, s = 0, l = t; l--; s += a[l]);
    		for(m = r.mean = s / t, l = t, s = 0; l--; s += $window.Math.pow(a[l] - m, 2));
	    	r.deviation = $window.Math.sqrt(r.variance = s / t);
		    r.high = $window.Math.round(r.mean + r.deviation);
    		r.low = $window.Math.round(r.mean - r.deviation);
	    	r.mean = $window.Math.round(r.mean);
		    return r;
    	};

	    var parseData = function (csv) {
		    var data = {};
      		data.endDates = [];
  	    	data.leadTimes = [];

  		    var lines = csv.split("\n");
      		lines = popLastIndexOfArrayIfEmpty(lines);

  	    	var str = "";
  		    var leadTimeSum = [];
      		for (var i in lines) {
        		var line = lines[i].split(",");
    	    	var obj = {};
    		    obj.y = parseInt(line[1]);
        		obj.name = line[2] + ' - ' + line[3] + '<br/>Start Date: ' + line[4] + '<br/>End Date: ' + line[0];
        		data.endDates.push(i);
    	    	data.leadTimes.push(obj);
    		    leadTimeSum.push(obj.y);
      		}
  	    	data.leadTimeStDevation = average(leadTimeSum);
  		    //console.log(data);
      		return data;
	    };

      	var popLastIndexOfArrayIfEmpty = function (arry) {
            	if (arry[arry.length] == "" || arry[arry.length] == null) {
              	arry.pop();
  	  	    }
        		return arry;
     	};
    }];
});
