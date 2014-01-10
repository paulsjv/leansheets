'use strict';

angular.module('highcharts', [])
  .directive('highChart', function ($parse) {
    return {
        link: function (scope, element, attrs) {
            scope.$watch('chartConfig', function (newVal) {
                if (newVal) {
                    var props = $parse(attrs.highChart)(scope);
                    props.chart.renderTo = element[0];
                    new Highcharts.Chart(props);
                }
            });
        }
    };
  });
