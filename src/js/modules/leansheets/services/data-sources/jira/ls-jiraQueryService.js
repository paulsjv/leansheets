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

    return ['$log','$http',function ($log, $http) {

        this.isError = function(response, localUrl = null) {
            if (localUrl !== null) {
                return (response === null || response.success === "false");
            }
            return false;
        };
        
        this.query = function(httpMethod, httpHeaders, restUrl, parameters, callback, timeout) {
            $log.debug('ls-queryService');
            let options = {
                url: restUrl, 
                method: httpMethod,
                headers: httpHeaders,
                params: parameters
            };
            (timeout) ? options.timeout = timeout : '';
            $log.debug('$http({options})', options);
            return $http(options)
            .success(function(response){
                $log.debug('ls-queryService: success', response);
                (callback) ? callback(response) : '';
            })
            .error(function(response){
                $log.debug('ls-queryService: error', response);
                (callback) ? callback(response) : '';
            });
        }
    }];
});