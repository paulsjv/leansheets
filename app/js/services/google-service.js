'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('dataService', []).
	service("DataService", ['DataServiceConfig', '$q', function(DataServiceConfig, $q) {
		this.getUrl = function () {
			console.log("$q" + $q);
			return DataServiceConfig.gUrl;
		};
		this.getData = function(type) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			var handleResponse = function(response) {
				setDataOnPromise(response, deferred);
			};

          	var query = new google.visualization.Query(DataServiceConfig.gUrl);
			//query.setQuery(DataServiceConfig.gQuery + '"' + type +'" order by D');
            query.setQuery(DataServiceConfig.gQuery + ' order by D');
	        query.send(handleResponse);

			return promise;
		};
		this.getCfdStartData = function(type) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			var handleResponse = function(response) {
				setDataOnPromise(response, deferred);
			}

			var query = new google.visualization.Query(DataServiceConfig.gUrl);
			query.setQuery(DataServiceConfig.gCfdStartDateQuery.replace("%s", type));
			query.send(handleResponse);

			return promise;
		};
		this.getCfdEndData = function(type) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			var handleResponse = function(response) {
				setDataOnPromise(response, deferred);
			}

			var query = new google.visualization.Query(DataServiceConfig.gUrl);
			query.setQuery(DataServiceConfig.gCfdEndDateQuery.replace("%s", type));
			query.send(handleResponse);

			return promise;
		};
		var isResponseError = function (response) {
	       	if (response.isError()) {
	          	return true;
	       	}
	       	return false;
	    };
	    var setDataOnPromise = function(response, deferred) {
	    	if (isResponseError(response)) {
					deferred.reject('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				}
				var dataTable = response.getDataTable();
				var csvData = google.visualization.dataTableToCsv(dataTable);
	        	deferred.resolve(csvData);
	        	return deferred;
	    };

	}]);

