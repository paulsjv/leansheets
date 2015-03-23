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

    return ['$log','$http','$q','$moment','$google','ls-googleConfigService',
            function ($log, $http, $q, $moment, $google, googleConfigService) {

        var dataSheetQuery = "select D, E, A, B, C where D is not null AND toDate(D) > toDate(date '" + getDateSixMonthsAgo() + "') ",
            configSheetQuery = 'select *',
            cfdStartDateSheetQuery = "select C, count(A) where %s and C is not null and toDate(C) > date '" + getDateSixMonthsAgo() + "' group by C",
            cfdEndDateSheetQuery = "select D, count(A) where %s and D is not null and toDate(C) > date '" + getDateSixMonthsAgo() + "' group by D";

        function getDateSixMonthsAgo() {
            var date = $moment();
            date.subtract(180, 'days');
            return date.format('YYYY-MM-DD');
        };

        this.getConfig = function() {
            var deferred = $q.defer(),
                promise = deferred.promise,
                handleResponse = function(response) {
                    setDataOnPromise(response, deferred);
                },
                query = new $google.visualization.Query(googleConfigService.getConfigUrl());

            $log.debug('Query for Config');
            $log.debug(configSheetQuery);
            query.setQuery(configSheetQuery);
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
                dataQuery = dataSheetQuery + ' AND ' + type.column + ' = "' + type.name +'" order by D', 
          	    query = new $google.visualization.Query(googleConfigService.getDataUrl());
			
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
                dataQuery = cfdStartDateSheetQuery.replace("%s", type.column + " = '" + type.name + "'"),
                query = new google.visualization.Query(googleConfigService.getDataUrl());

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
                dataQuery = cfdEndDateSheetQuery.replace("%s", type.column + " = '" + type.name + "'"),
                query = new google.visualization.Query(googleConfigService.getDataUrl());
                
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
