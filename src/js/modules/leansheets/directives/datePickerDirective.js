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
    return ['$log', 'ls-configService', function ($log, configService) {

        return {

            scope: {
                dateRangeStartDate: '=',
                dateRangeEndDate: '='
            }, 

            template: '<div class="input-daterange input-group" id="datepicker">    <input type="text" class="input-sm form-control" name="start" ng-model="dateRangeStartDate"/>    <span class="input-group-addon">to</span>    <input type="text" class="input-sm form-control" name="end" ng-model="dateRangeEndDate"/></div>',
            replace: true,

            link: function (scope, $elem, attrs) {

                /**
                 * Do any and all DOM Manipulation here.
                 *
                 * If, for some reason, you need to manipulate the DOM earlier in the lifecycle,
                 * take a look at the directive compile method.
                 */
                $elem.datepicker({
                    autoclose: true,
                    todayBtn: true,
                    todayHighlight: true,
                    format: configService.getDatePickerFormat()
                });

                scope.$watch('dateRangeStartDate', function(changedValue) {
                    $log.debug('datePickerDirective: dateRangeStartDate change:', changedValue);
                });

                scope.$watch('dateRangeEndDate', function(changedValue) {
                   $log.debug('datePickerDirective: dateRangeEndDate change:', changedValue);
                }); 
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
