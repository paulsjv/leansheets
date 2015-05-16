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

    return ['$log','$cacheFactory','$jssha','$moment','ls-configService', function ($log, $cacheFactory, $jssha, $moment, configService) {
        var ttl = configService.getCacheTtl(), // get from config in seconds
            cache = $cacheFactory('ls-leansheets-cache'),
            // keys = [], // for later use if needing to remove any outstanding cached items with removeAll
            that = this;

        this.get = function(key) {
            $log.debug('ls-cacheService: in get');
            $log.debug('ls-cacheService: key', key);
            var data = undefined;
            if (inCache(key)) {
                data = cache.get(key).data;
                $log.debug('ls-cacheService: returning cached data', data);
                return data;
            }
            $log.debug('ls-cacheService: returning cached data', data);
            return data;
        };

        this.put = function(key, data) {
            $log.debug('ls-cacheService: in put');
            $log.debug('ls-cacheService: key', key);
            $log.debug('ls-cacheService: data', data);
            // insert hash of data due to possible changing date range
            var save = {
                    hash: getHash(key),
                    data: data,
                    created: $moment().format() // default format is ISO-8601
                };

            if (that.get(key) === undefined) {
                cache.put(key, save);
                // keys.push(key);
            }
            return data;
        };

        var inCache = function(key) {
            if (cache.get(key) !== undefined &&
                isTtl(cache.get(key).created)) {
                    return true;
            }
            $log.debug('ls-cacheService: removing cache for: ', key);
            cache.remove(key);
            // keys.pop(key);
            return false;
        };

        var getHash = function(data) {
            var sha = new $jssha(data, 'TEXT');
            return sha.getHash('SHA-256', 'HEX');
        };

        /*
         *  return true if cache has been held less than the ttl
         *         false if cache has been held longer than the ttl
         */
        var isTtl = function(created) {
            var seconds = $moment().diff($moment(created), 'seconds');
            $log.debug('ls-cacheService: isTtl seconds: ', seconds);
            return (ttl > seconds) ? true : false;
        };

    }];
});
