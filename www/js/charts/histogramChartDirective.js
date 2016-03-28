import { select } from 'd3-selection';
// import { time } from 'd3-time';
import { scaleLinear, scaleBand } from 'd3-scale';
// import { format } from 'd3-format';
// import { extent } from 'd3-array';
// import { axisBottom, axisLeft } from 'd3-axis';
// import { line } from 'd3-shape';
import { max } from 'd3-array';

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

            let data = [{ frequency: 3, percentage: 13, leadtime: 2 }, 
						{ frequency: 5, percentage: 25, leadtime: 5 }, 
						{ frequency: 8, percentage: 50, leadtime: 7 }, 
						{ frequency: 3, percentage: 63, leadtime: 10 }, 
						{ frequency: 1, percentage: 68, leadtime: 11 }, 
						{ frequency: 4, percentage: 75, leadtime: 15 }, 
						{ frequency: 2, percentage: 82, leadtime: 17 }, 
						{ frequency: 2, percentage: 90, leadtime: 20 }, 
						{ frequency: 1, percentage: 92, leadtime: 21 }, 
						{ frequency: 3, percentage: 98, leadtime: 25 }, 
						{ frequency: 1, percentage: 100,leadtime: 50 }];

			let //margin = {top: 20, right: 30, bottom: 30, left: 40},
			    width = 960, // - margin.left - margin.right,
				height = 500; // - margin.top - margin.bottom;

			let leadtime = data.map((d) => { return d.leadtime; });
			let frequency = data.map((d) => { return d.frequency; });
            log.debug('leadtime',leadtime);
			let x = scaleBand()
						.domain([0, max(leadtime)])
						.range([0, width])
                        .round(true);
            x.padding(1);
            log.debug('scale band width: ', x.bandwidth());
			let y = scaleLinear()
						.domain([0, max(frequency)])
						.range([height, 0]);

			// let xAxis = axisBottom(x);
			// let yAxis = axisLeft(y);

			let histogram = select(elm[0]).attr('width', width + 'px').attr('height', height + 'px');
//								.attr('width', width + margin.left + margin.right + 'px')
//								.attr('height', height + margin.top + margin.bottom + 'px');
			let chart = histogram.append('svg').attr('width', width + 'px').attr('height', height + 'px');
//							.attr('width', width + margin.left + margin.right + 'px')
//							.attr('height', height + margin.top + margin.bottom + 'px');
/*
			chart.append('g')
					.attr('transform', 'translate(0, ' + height + ')')
					.call(xAxis);
			chart.append('g')
					.call(yAxis);
*/
            // let barWidth = width / data.length;

			chart.selectAll('.bar')
						.data(data)
					.enter().append('g')
                        .attr('transform', (d, i) => { return 'translate(' + i * 30 + ', 0)'; } )
                    .append('rect')
						.attr('class', 'bar')
//						.attr('x', (d) => { return x(d.leadtime); })
						.attr('y', (d) => { return y(d.frequency); })
						.attr('height', (d) => { return height - y(d.frequency); })
						.attr('width', 10)
//						.style('stroke-width', 3)
                    .append('text')
                        .attr('y', height - 15)
                        .attr('dy', '.75em')
                        .text((d) => { return d.leadtime; });
/*			bar.append('text')
				.attr('x', barWidth / 2) 
				.attr('y', height - 15)
				.attr('dy', '.75em')
				.text((d) => { return d.leadtime; });
*/
/*
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
*/
        }

    };

};
