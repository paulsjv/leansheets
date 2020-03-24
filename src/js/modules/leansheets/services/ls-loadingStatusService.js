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

    return ['$log','$rootScope', function ($log, $rootScope) {

        var _total = 0, _count = 0;

        var updateStatus = function() {
            if (_total > 0) {
                $log.debug('ls-loadingStatusService: boradcasging loadingStatus:update event', ((_count / _total) * 100));
                $rootScope.$broadcast('loadingStatus:update',{ status: (Math.round((_count / _total) * 100)), total: _total, count: _count } );
            } else {
                $log.debug('ls-loadingStatusService: boradcasging loadingStatus:update event', 0);
                $rootScope.$broadcast('loadingStatus:update',{ status: 0, total: _total, count: _count } );
            }
        };

        this.reset = function() {
            _total = 0;
            _count = 0;
            updateStatus();
        };

        this.updateCount = function(count) {
            $log.debug('ls-loadingStatusService: updateCount: count', count);
            $log.debug('ls-loadingStatusService: updateCount: _count', _count);
            _count = _count + count;
            $log.debug('ls-loadingStatusService: updateCount: _count', _count);
            updateStatus();
        };

        this.setTotal = function(total) {
            $log.debug('ls-loadingStatusService: updateCount: total', total);
            $log.debug('ls-loadingStatusService: updateCount: _total', _total);
            _total = total
            $log.debug('ls-loadingStatusService: updateCount: _total', _total);
            updateStatus();
        };

    }];
});
