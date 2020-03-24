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

    return ['$log','$q','ls-dataSourceService', 
            function ($log, $q, dataSourceService) {

        this.getNumberOfItemsToLoad = function(instance, query) {
            $log.debug('ls-downloadService: getNumberOfItemsToLoad(instance): ', instance);
            var deferred = $q.defer(),
                promise = deferred.promise,
                directivePromise = dataSourceService.getDataSource(instance).getNumberOfItemsToLoad(query);

                directivePromise.then(
                    function (success){
                        $log.debug('ls-downloadService: Success: Got the number of items to laod: getNumberOfItemsToLoad()!', success);
                          deferred.resolve(success);
                    }, function (error) {
                        $log.error('ls-downloadService: Error getting the number of items to load: getNumberOfItemsToLoad()!', error);
                        deferred.reject(error);
                    });

                return promise;
        };

        this.getData = function(instance, query, startAt = 0) {
            $log.debug('ls-downloadService: getData(instance): ', instance);
            var deferred = $q.defer(),
                promise = deferred.promise,
                directivePromise = dataSourceService.getDataSource(instance).getData(query, startAt);

            directivePromise.then(
                function (success){
                    $log.debug('ls-downloadService: Got the data to laod: ls-downloadService!', success);
      	            deferred.resolve(success);
                }, function (error) {
                    $log.error('ls-downloadService: Error getting data to load!', error);
                    deferred.reject(error);
                });
            return promise;
        };
    }];
});
