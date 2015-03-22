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

    return ['$log','CONFIG','$google', function ($log, config, $google) {
        this.getDataUrl = function() {
            return config.dataUrl;
        };

        this.getConfigUrl = function() {
            return config.configUrl;
        };
    }];
});
