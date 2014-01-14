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
		this.getData = function(type) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			var isResponseError = function (response) {
	          if (response.isError()) {
	            return true;
	          }
	          return false;
	        };
			
			var handleResponse = function(response) {
				if (isResponseError(response)) {
					deferred.reject('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				}
				var dataTable = response.getDataTable();
				var csvData = google.visualization.dataTableToCsv(dataTable);
	        	deferred.resolve(csvData);
			};

          	var query = new google.visualization.Query(GoogleConfig.gUrl);
			query.setQuery(GoogleConfig.gQuery + '"' + type +'"');
	        query.send(handleResponse);

			return promise;
		};

	}]);
  
