import { select, selctAll, svg } from 'd3-selection';
import { time } from 'd3-time';
import { scaleLinear, scaleBand } from 'd3-scale';
import { format } from 'd3-format';
import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { min, max } from 'd3-array';

var log, x, y, element, chart;

let resize = function() {
    // update width
    let width = parseInt(select(element.parentNode).style('width'), 10);
    log.debug('directive resize width: ', width);
    // reset x range
    x.range([0, width]);
    
    // resize the chart
    select(chart.node().parentNode)
   //     .style('height', (y.rangeExtent()[1] + margin.top + margin.bottom) + 'px')
        .style('width', (width) + 'px');
/*
    chart.selectAll('rect.background')
        .attr('width', width);

    chart.selectAll('rect.percent')
        .attr('width', function(d) { return x(d.percent); });
*/
};


export default ($log) => {
    'ngInject';

    log = $log;
    // Resizing window logic
    select(window).on('resize', () => { resize(); });

    return {
        scope: {},
        restrict: 'E',
        link: (scope, elm) => {
            log.debug('histogramChartDirective.js - in link!');

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

            // element is defined at top of file
            element = elm[0];

            // chart properties
            let width = parseInt(select(element).style('width'), 10),
                height = 400, // hard code for now
            // container for bars of historgram
                clipWidth = width * .7, // 70% of width
                clipHeight = height * .9 // 90% of height

            log.debug('directive width: ', width);
            log.debug('directive height:', height);

            // Lead times for X-Axis
            let leadtime = data.map((d) => { return d.leadtime; }),
                maxLeadtime = max(leadtime),
                minLeadtime = min(leadtime);

            log.debug('leadtime: ', leadtime);
            log.debug('max leadtime: ', maxLeadtime);
            log.debug('min leadtime: ', minLeadtime);

            // x is defined at top of file since it is used in resize()
            //      for responsive charting.
            // D3.js X-Axis implemenation see:
            //      https://github.com/d3/d3-scale#band-scales
            x = scaleBand()
					.domain(leadtime)
					.rangeRound([0, width]);
            // Padding between bars both inner and outter padding
            x.padding(.58);

            log.debug('band(value)', x(maxLeadtime));
            log.debug('band.bandwidth(): ', x.bandwidth());
            log.debug('band.step()', x.step());
            log.debug('band.padding()', x.padding());

            // Frequency for how tall each bar is on left Y-Axis
            let frequency = data.map((d) => { return d.frequency; }),
                maxFrequency = max(frequency),
                minFrequency = min(frequency),
                barHeight = Math.round(height / (maxFrequency ));

            log.debug('barHeight', barHeight);
            log.debug('frequency:', frequency);
            log.debug('max frequency:', maxFrequency);
            log.debug('min frequency:', minFrequency);

            // y is defined at top of file since it is used in resize()
            //      for responsive charting.
            // D3.js Y-Axis implemenation see:
            //      https://github.com/d3/d3-scale#linear-scales
            //      https://github.com/d3/d3-scale#continuous-scales
            y = scaleLinear()
                    .domain([minFrequency, maxFrequency])
                    .range([0, height]);

            // Creating the chart and all the SVG elements for it.
            // chart is defined at the top of the file since it is used in resize()
            chart = select(element)
                            .append('svg')
                                .style('width', width).style('height', height)
                            .append('g');

            // Each bar in the histogram defined here
            var bars = chart.selectAll('.bar')
                    .data(data)
                  .enter().append('rect')
                    .attr('class', 'bar background')
                    .attr('width', x.bandwidth())
                    .attr('height', (d) => { return d.frequency * barHeight; })
                    .attr('x', (d) => { return x(d.leadtime); })
                    .attr('y', (d) => { return height - (d.frequency * barHeight); });
        }

    };

};
