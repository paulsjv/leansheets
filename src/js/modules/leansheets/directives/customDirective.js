/**
 * The directives/ directory should only include angular directive definitions.
 *
 * Naming Convention:
 *
 * 1. Never include `di-` prefix
 * 2. instanceStyleCamelCasing
 * 3. Optionally include `Directive` suffix
 *
 * i.e. customDirective.js OR custom.js
 */
define(['angular'], function (ng) {
    'use strict';

    /**
     * Returns angular "array-syntax" directive definition.
     *
     * Parameter options include all standard angular services, plus any provided by
     * module-level dependencies.
     */
    return ['$log', function () {

        return {

            scope: {},

            template: '<div>{{ helloWorld }}</div>',
            replace: true,

            link: function ($scope, $elem, attrs) {

                /**
                 * Do any and all DOM Manipulation here.
                 *
                 * If, for some reason, you need to manipulate the DOM earlier in the lifecycle,
                 * take a look at the directive compile method.
                 */

            },

            /**
             * Even though there exists a controllers/ directory under this module,
             * controllers for directives should be contained within the directive itself.
             *
             * This allows devs to better understand the scope and responsibilities for the directive as a whole.
             */
            controller: ['$scope', function ($scope) {

                $scope.helloWorld = "Hello World from the Directive";

            }]

        };

    }];

});
