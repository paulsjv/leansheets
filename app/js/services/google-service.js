'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('googleService', []).
	service("GoogleService", ['GoogleConfig', '$q', '$timeout', function(GoogleConfig, $q, $timeout) {
		this.getUrl = function () { 
			console.log("$q" + $q);
			console.log("$timeout" + $timeout);
			return GoogleConfig.gUrl; 
		};
		this.getData = function(title, div) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			var data;

			var isResponseError = function (response) {
	          if (response.isError()) {
	            alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
	            return true;
	          }
	          return false;
	        }
			
			var handleResponse = function(response) {
				if (isResponseError(response)) {
					deferred.reject('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				}
				var dataTable = response.getDataTable();
				var csvData = google.visualization.dataTableToCsv(dataTable);
				
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
	          		// data.avgLeadTime = line[4];
	          		return data;
	        	};

		        var popLastIndexOfArrayIfEmpty = function (arry) {
		          	if (arry[arry.length] == "" || arry[arry.length] == null) {
	    	        	arry.pop();
	        	  	}
	          		return arry;
	        	};

	        	data = parseData(csvData);
	        	deferred.resolve(data);
			};

          	var query = new google.visualization.Query(GoogleConfig.gUrl);
			query.setQuery(GoogleConfig.gQuery + '"' + title +'"');
	        query.send(handleResponse);

	        // return $timeout(function() {
         //  		if (data === 'undefined' || data === null) {
         //  			return false;
         //  		} else { return data; }
         //  	}, 2000);

			return promise;
		};
		//var query = "select D, E, A, B where D is not null AND F = ";
        //var gQuery1 = new google.visualization.Query(sheet);
	}]);
  
