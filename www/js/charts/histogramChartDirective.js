import {
    select, svg
} from 'd3-selection';

import {
  time
} from 'd3-time';

import {
  scaleTime, scaleLinear
} from 'd3-scale';

import {
  format
} from 'd3-format';

import {
  extent
} from 'd3-array';

import {
  axisBottom, axisLeft
} from 'd3-axis';

import {
  line
} from 'd3-shape';


var log;

export default ($log) => {
    'ngInject';

    log = $log;

    return {
        scope: {},
        restrict: 'E',
        link: (scope, elm) => {
            log.debug('histogramChartDirective.js - in link!');
            log.debug('d3.select: ', select);
            elm.text('myhistogram chart');

            let data = [{
                frequency: 3,
                percentage: 13,
                leadtime: 2
            }, {
                frequency: 5,
                percentage: 25,
                leadtime: 5
            }, {
                frequency: 8,
                percentage: 50,
                leadtime: 7
            }, {
                frequency: 3,
                percentage: 63,
                leadtime: 10
            }, {
                frequency: 1,
                percentage: 68,
                leadtime: 11
            }, {
                frequency: 4,
                percentage: 75,
                leadtime: 15
            }, {
                frequency: 2,
                percentage: 82,
                leadtime: 17
            }, {
                frequency: 2,
                percentage: 90,
                leadtime: 20
            }, {
                frequency: 1,
                percentage: 92,
                leadtime: 21
            }, {
                frequency: 3,
                percentage: 98,
                leadtime: 25
            }, {
                frequency: 1,
                percentage: 100,
                leadtime: 50
            }];

            var outerWidth = 500;
            var outerHeight = 250;
            var margin = {
                left: 70,
                top: 5,
                right: 5,
                bottom: 60
            };
            var xColumn = "leadtime";
            var yColumn = "frequency";
            var xAxisLabelText = "Lead Time";
            var xAxisLabelOffset = 48;
            var yAxisLabelText = "Frequency";
            var yAxisLabelOffset = 40;
            var innerWidth = outerWidth - margin.left - margin.right;
            var innerHeight = outerHeight - margin.top - margin.bottom;
            var svg = select("histogram-chart").append("svg")
                .attr("width", outerWidth)
                .attr("height", outerHeight);
            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            var path = g.append("path")
                .attr("class", "chart-line");
            var xAxisG = g.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + innerHeight + ")");
            var xAxisLabel = xAxisG.append("text")
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + (innerWidth / 2) + "," + xAxisLabelOffset + ")")
                .attr("class", "label")
                .text(xAxisLabelText);
            var yAxisG = g.append("g")
                .attr("class", "y axis");
            var yAxisLabel = yAxisG.append("text")
                .style("text-anchor", "middle")
                .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
                .attr("class", "label")
                .text(yAxisLabelText);
            var xScale = scaleTime().range([0, innerWidth]);
            var yScale = scaleLinear().range([innerHeight, 0]);
            var xAxis = axisBottom(xScale);
            var yAxis = axisLeft(yScale);
            var l = line(data)
                .x(function(d) {
                    return xScale(d[xColumn]);
                })
                .y(function(d) {
                    return yScale(d[yColumn]);
                });

            function render(data) {
                xScale.domain(extent(data, function(d) {
                    return d[xColumn];
                }));
                yScale.domain(extent(data, function(d) {
                    return d[yColumn];
                }));
                xAxisG.call(xAxis);
                yAxisG.call(yAxis);
                path.attr("d", l(data));
            }

            render(data);

        }

    };

};
