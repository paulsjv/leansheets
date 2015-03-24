/**
 * The services/ directory should only include angular service definitions.
 *
 * Naming Convention:
 *
 * 1. Always include `ls-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always include `Service` suffix
 *
 * i.e. configService.js
 */
define(['angular'], function (ng) {
    'use strict';

    return ['$log','$http','$q','$moment','$google','ls-configService','ls-queryService',
            function ($log, $http, $q, $moment, $google, configService, queryService) {
    
        this.getConfig = function() {
            var deferred = $q.defer(),
                promise = deferred.promise,
                handleResponse = function(response) {
                    setDataOnPromise(response, deferred);
                },
                query = new $google.visualization.Query(configService.getConfigUrl()),
                configQuery = queryService.getConfigQuery();

            $log.debug('Query for Config');
            $log.debug(configQuery);
            query.setQuery(configQuery);
            query.send(handleResponse);

            return promise;
        };
        
		this.getData = function(type) {
            $log.debug('googleService.getData');
			var deferred = $q.defer(),
			    promise = deferred.promise,
    			handleResponse = function(response) {
	    			setDataOnPromise(response, deferred);
		    	},
          	    query = new $google.visualization.Query(configService.getDataUrl()),
                dataQuery = queryService.getDataQuery(type);
			
            $log.debug('Query for Run Chart & Histogram');
            $log.debug(dataQuery);
            query.setQuery(dataQuery);
	        query.send(handleResponse);

			return promise;
		};
        
		this.getCfdStartData = function(type) {
			var deferred = $q.defer(),
			    promise = deferred.promise,
                handleResponse = function(response) {
				    setDataOnPromise(response, deferred);
			    },
                query = new google.visualization.Query(configService.getDataUrl()),
                dataQuery = queryService.getCfdStartQuery(type);

            $log.debug('Query for start dates CFD Chart');
            $log.debug(dataQuery);
			query.setQuery(dataQuery);
			query.send(handleResponse);

			return promise;
		};

		this.getCfdEndData = function(type) {
			var deferred = $q.defer(),
			    promise = deferred.promise,
                handleResponse = function(response) {
				    setDataOnPromise(response, deferred);
			    },
                query = new google.visualization.Query(configService.getDataUrl()),
                dataQuery = queryService.getCfdEndQuery(type);
                
            $log.debug('Query for end dates CFD Chart');
            $log.debug(dataQuery);    
			query.setQuery(dataQuery);
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
                    $log.error('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
					deferred.reject('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                    return deferred;
            }
			var dataTable = response.getDataTable();
			var csvData = $google.visualization.dataTableToCsv(dataTable);
	        deferred.resolve(csvData);
	        return deferred;
	    };
    }];
});
