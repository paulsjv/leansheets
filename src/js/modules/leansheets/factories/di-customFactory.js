/**
 * The factories/ directory should only include angular factory definitions.
 *
 * Naming Convention:
 *
 * 1. Always include `di-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always include `Factory` suffix
 *
 * i.e. di-customFactory.js
 */
define([
    'angular',
    '../support/SupportClass'
], function (ng, SupportClass) {
    'use strict';

    /**
     * Returns angular "array-syntax" factory definition.
     *
     * Parameter options include all standard angular services, plus any provided by
     * module-level dependencies.
     */
    return ['$log', function () {

        /**
         * Factories should almost always follow the factory pattern.
         * I prefer using 'create' as the prefix followed by the class name
         */
        return {

            createSupportClass: function () {
                return new SupportClass('World');
            }

        };

    }];

});
