'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('googleService', []).
	service("GoogleService", ['GoogleConfig', '$q', function(GoogleConfig, $q) {
		this.getUrl = function () { 
			console.log("$q" + $q);
			return GoogleConfig.gUrl; 
		};
		this.getData = function(title, div) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			var isResponseError = function (response) {
	          if (response.isError()) {
	            return true;
	          }
	          return false;
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
          		// data.avgLeadTime = line[4];
          		return data;
        	};

        	var popLastIndexOfArrayIfEmpty = function (arry) {
	          	if (arry[arry.length] == "" || arry[arry.length] == null) {
    	        	arry.pop();
        	  	}
          		return arry;
        	};
			
			var handleResponse = function(response) {
				if (isResponseError(response)) {
					deferred.reject('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				}
				var dataTable = response.getDataTable();
				var csvData = google.visualization.dataTableToCsv(dataTable);
	        	deferred.resolve(parseData(csvData));
			};

          	var query = new google.visualization.Query(GoogleConfig.gUrl);
			query.setQuery(GoogleConfig.gQuery + '"' + title +'"');
	        query.send(handleResponse);

			return promise;
		};

	}]);
  
