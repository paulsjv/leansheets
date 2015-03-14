/**
 * The services/ directory should only include angular service definitions.
 *
 * Naming Convention:
 *
 * 1. Always include `di-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always include `Service` suffix
 *
 * i.e. di-customService.js
 */
define(['angular'], function (ng) {
    'use strict';

    return ['$log', function () {

        this.helloWorld = function () {
            return "Hello World from Service";
        };

    }];

});
