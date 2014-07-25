'use strict';

angular.module('histogramChartCtrl', []).
    controller('HistogramChartCtrl', ['$scope', 'DataService', '$window', function($scope, DataService, $window) {
    
    // $scope.workTypes = ["Display","Defect","CMS","Platform","Expedite"];
    $scope.workTypes = ["Standard","Intangable","Fixed Date","Expedite","Engineering Support"];
    $scope.workType = $scope.workTypes[0];

    $scope.getWorkType = function(workType) {
        var directivePromise = DataService.getData(workType);
        directivePromise.then(function (success){
  		      $scope.featureConfig = $scope.getOptionsForChart(workType, $scope.parseData(success));
        }, function (error) {
            alert(error);
        });
    };

    $scope.getWorkType($scope.workType);

    $scope.getOptionsForChart = function (title, data) {
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
                        text: 'Fequency'
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
                name: 'Percetange of Total',
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

    $scope.parseData = function (csv) {
        // key of data array is the lead time
        // value of data array is the number of times lead time shows in data set 
        var data = new Array();
        var obj = {
            categories: new Array(),
            frequency: new Array(),
            percentOfTotal: new Array()
        };

        var lines = csv.split("\n");
        lines = $scope.popLastIndexOfArrayIfEmpty(lines);   
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

  	$scope.popLastIndexOfArrayIfEmpty = function (arry) {
        	if (arry[arry.length] == "" || arry[arry.length] == null) {
          	arry.pop();
  	  	}
    		return arry;
  	};

}]);