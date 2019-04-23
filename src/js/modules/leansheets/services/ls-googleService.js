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
         * sheetKey is passed in via the getConfig method.  The getConfig method is called
         * any time the typeService gets the workTypes from a specific sheet.  The sheetKey
         * member variable is saved when the getConfig is called so that the rest of the
         * class can use it to pass as part of the cache key and to get the sheet URL.
         * @member {string}
         */
        var sheetKey;

        this.getConfig = function(sheet) {
            sheetKey = sheet;
            var deferred = $q.defer(),
                promise = deferred.promise,
                configQuery = queryService.getConfigQuery(),
                cachedData = cacheService.get(configQuery + sheetKey),
                handleResponse = function(response) {
                    var data = setDataOnPromise(response, deferred);
                    cacheService.put(configQuery + sheetKey, data);
                },
                query;

            $log.debug('Query for Config');
            $log.debug(configQuery);
            if (cachedData === undefined) {
                $log.debug('ls-googleService: there was no cached config', configQuery);
                $log.debug('*************** Calling Google Over the Wire ***************');
                // query = new $google.visualization.Query(configService.getConfigUrl(sheetKey));
                // query.setQuery(configQuery);
                // query.send(handleResponse);
                var configUrl = configService.getDataUrl(sheetKey);
                var encodedParam = encodeURIComponent(configUrl.split('?url=')[1]);
                console.log(encodedParam);
                $http({
                    url: configUrl, 
                    method: 'GET',
                    params: { encodedUrl: encodedParam }
                }).success(function() {
                    $log.debug('Success in calling for Config');
                })
                .error(function(){
                    $log.debug('Error in calling for Config');
                });
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
                cachedData = cacheService.get(dataQuery + sheetKey),
    			handleResponse = function(response) {
	    			var data = setDataOnPromise(response, deferred);
                    cacheService.put(dataQuery + sheetKey, data);
		    	},
                query;

            $log.debug('Query for Run Chart & Histogram');
            $log.debug(dataQuery);
            if (cachedData === undefined) {
                $log.debug('ls-googleService: there was no cached data', dataQuery);
                $log.debug('*************** Calling Google Over the Wire ***************');
                // query = new $google.visualization.Query(configService.getDataUrl(sheetKey)),
                // query.setQuery(dataQuery);
	            // query.send(handleResponse);
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
                cachedData = cacheService.get(dataQuery + sheetKey),
                handleResponse = function(response) {
				    var data = setDataOnPromise(response, deferred);
                    cacheService.put(dataQuery + sheetKey, data);
			    },
                query;

            $log.debug('Query for start dates CFD Chart');
            $log.debug(dataQuery);
            if (cachedData === undefined) {
                $log.debug('ls-googleService: there was no cached data', dataQuery);
                $log.debug('*************** Calling Google Over the Wire ***************');
                // query = new google.visualization.Query(configService.getDataUrl(sheetKey))
			    // query.setQuery(dataQuery);
			    // query.send(handleResponse);
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
                cachedData = cacheService.get(dataQuery + sheetKey),
                handleResponse = function(response) {
				    var data = setDataOnPromise(response, deferred);
                    cacheService.put(dataQuery + sheetKey, data);
			    },
                query;

            $log.debug('Query for end dates CFD Chart');
            $log.debug(dataQuery);
            if (cachedData === undefined) {
                $log.debug('ls-googleService: there was no cached data', dataQuery);
                $log.debug('*************** Calling Google Over the Wire ***************');
                // query = new google.visualization.Query(configService.getDataUrl(sheetKey)),
    			// query.setQuery(dataQuery);
    			// query.send(handleResponse);
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

            if (!csvData) {
				$log.debug('ls-googleService: No data for date range and work type(s) selected');
                deferred.reject({
                    errorcode : '1',
                    message : 'ls-googleService: No data for date range and work type(s)'
                });
                return undefined;
            } else {
                deferred.resolve(csvData);
                return csvData;
            }
	    };
    }];
});
