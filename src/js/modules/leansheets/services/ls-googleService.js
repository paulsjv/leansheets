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

    return ['$log','$http','$q','$moment','$google','ls-configService','ls-queryService','ls-cacheService',
            function ($log, $http, $q, $moment, $google, configService, queryService, cacheService) {

        /** 
         * this.sheetKey gets set when the application controller calls the typeService.getWorkTypes
         * In the getConfig method it is set so that in the getData<ChartType> method it is used.  This works 
         * because everytime that the sheet changes the getConfig is called and updates the sheetKey.
         * @member {string} 
         */
        var sheetKey;

        this.getConfig = function(sheet) {
            sheetKey = sheet;
            var deferred = $q.defer(),
                promise = deferred.promise,
                configQuery = queryService.getConfigQuery(),
                cachedData = cacheService.get(configQuery),
                handleResponse = function(response) {
                    var data = setDataOnPromise(response, deferred);
                    cacheService.put(configQuery, data);
                },
                query;

            $log.debug('Query for Config');
            $log.debug(configQuery);
            if (cachedData === undefined) {
                $log.debug('ls-googleService: there was no cached config', configQuery);
                $log.debug('*************** Calling Google Over the Wire ***************');
                query = new $google.visualization.Query(configService.getConfigUrl(sheetKey));
                query.setQuery(configQuery);
                query.send(handleResponse);
            } else {
                $log.debug('ls-googleService: resolving with cached data', cachedData);
                deferred.resolve(cachedData);
            }

            return promise;
        };

		this.getData = function(types) {
            $log.debug('ls-googleService: getData');
			var deferred = $q.defer(),
			    promise = deferred.promise,
                dataQuery = queryService.getDataQuery(types),
                cachedData = cacheService.get(dataQuery),
    			handleResponse = function(response) {
	    			var data = setDataOnPromise(response, deferred);
                    cacheService.put(dataQuery, data);
		    	},
                query;

            $log.debug('Query for Run Chart & Histogram');
            $log.debug(dataQuery);
            if (cachedData === undefined) {
                $log.debug('ls-googleService: there was no cached data', dataQuery);
                $log.debug('*************** Calling Google Over the Wire ***************');
                query = new $google.visualization.Query(configService.getDataUrl(sheetKey)),
                query.setQuery(dataQuery);
	            query.send(handleResponse);
            } else {
                $log.debug('ls-googleService: resolving with cached data', dataQuery);
                deferred.resolve(cachedData);
            }
			return promise;
		};

		this.getCfdStartData = function(types) {
			var deferred = $q.defer(),
			    promise = deferred.promise,
                dataQuery = queryService.getCfdStartQuery(types),
                cachedData = cacheService.get(dataQuery),
                handleResponse = function(response) {
				    var data = setDataOnPromise(response, deferred);
                    cacheService.put(dataQuery, data);
			    },
                query;

            $log.debug('Query for start dates CFD Chart');
            $log.debug(dataQuery);
            if (cachedData === undefined) {
                $log.debug('ls-googleService: there was no cached data', dataQuery);
                $log.debug('*************** Calling Google Over the Wire ***************');
                query = new google.visualization.Query(configService.getDataUrl(sheetKey))
			    query.setQuery(dataQuery);
			    query.send(handleResponse);
            } else {
                $log.debug('ls-googleService: resolving with cached data', dataQuery);
                deferred.resolve(cachedData);
            }

			return promise;
		};

		this.getCfdEndData = function(types) {
			var deferred = $q.defer(),
			    promise = deferred.promise,
                dataQuery = queryService.getCfdEndQuery(types),
                cachedData = cacheService.get(dataQuery),
                handleResponse = function(response) {
				    var data = setDataOnPromise(response, deferred);
                    cacheService.put(dataQuery, data);
			    },
                query;

            $log.debug('Query for end dates CFD Chart');
            $log.debug(dataQuery);
            if (cachedData === undefined) {
                $log.debug('ls-googleService: there was no cached data', dataQuery);
                $log.debug('*************** Calling Google Over the Wire ***************');
                query = new google.visualization.Query(configService.getDataUrl(sheetKey)),
    			query.setQuery(dataQuery);
    			query.send(handleResponse);
            } else {
                $log.debug('ls-googleService: resolving with cached data', dataQuery);
                deferred.resolve(cachedData);
            }
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
                    return undefined;
            }
			var dataTable = response.getDataTable();
			var csvData = $google.visualization.dataTableToCsv(dataTable);
	        deferred.resolve(csvData);
            return csvData;
	    };
    }];
});
