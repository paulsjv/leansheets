import { select, selectAll } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { min, max } from 'd3-array';

var log, x, y, element, svg, bars;

let resize = function() {
    // get new width of parent node of svg width
    let svgWidth = getSvgWidth(element);
    log.debug('directive resize width: ', svgWidth);

    // update svg with new width
    svg.style('width', svgWidth);

    // reset x range
    let barContainerWidth = getBarContainerWidth(svgWidth, getClipWidth(svgWidth));
    x.rangeRound([0, barContainerWidth]);
    log.debug('bar continer width', barContainerWidth);
    log.debug('x.bandwidth()', x.bandwidth());

    // update all bars
    selectAll('rect.bar')
        .attr('width', x.bandwidth())
        .attr('x', (d) => { return x(d.leadtime); });
};

let getSvgWidth = (elm) => {
    return parseInt(select(elm).style('width'), 10);
};

let getClipWidth = (width) => {
    return Math.round(width * .9);
};

let getBarContainerWidth = (svgWidth, clipWidth) => {
    return svgWidth - (svgWidth - clipWidth);
};

export default ($log) => {
    'ngInject';

    log = $log;
    // Resizing window logic
    select(window).on('resize', resize);

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

            // svg properties
            let svgWidth = getSvgWidth(element),
                svgHeight = 400, // hard code for now
            // container for bars of historgram also margins
                clipWidth = getClipWidth(svgWidth), // 90% of width
                clipHeight = Math.round(svgHeight * .7); // 70% of height
           // bar container 
            let barContainerWidth = getBarContainerWidth(svgWidth, clipWidth),
                barContainerHeight = svgHeight - (svgHeight - clipHeight); 

            log.debug('directive width: ', svgWidth);
            log.debug('directive height:', svgHeight);
            log.debug('barContainerHeight', barContainerHeight);
            log.debug('barContainerWidth', barContainerWidth);

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
					.rangeRound([0, barContainerWidth]);
            // Padding between bars both inner and outter padding
            // TODO: change padding to be responsive and have a min and max for bar width
            x.padding(.58); // .58

            log.debug('band(value)', x(maxLeadtime));
            log.debug('band.bandwidth(): ', x.bandwidth());
            log.debug('band.step()', x.step());
            log.debug('band.padding()', x.padding());

            // Frequency for how tall each bar is on left Y-Axis
            let frequency = data.map((d) => { return d.frequency; }),
                maxFrequency = max(frequency),
                minFrequency = min(frequency),
                barHeight = Math.round(barContainerHeight / (maxFrequency ));

            log.debug('barHeight', barHeight);
            log.debug('frequency:', frequency);
            log.debug('max frequency:', maxFrequency);
            log.debug('min frequency:', minFrequency);

            // y is defined at top of file since it is used in resize()
            //      for responsive charting.
            // D3.js Y-Axis implemenation see:
            //      https://github.com/d3/d3-scale#linear-scales
            //      https://github.com/d3/d3-scale#continuous-scales
/*            y = scaleLinear()
                    .domain([minFrequency, maxFrequency])
                    .range([barContainerHeight, 0]);
*/
            // Creating the svg and all the SVG elements for it.
            // svg is defined at the top of the file since it is used in resize()
            svg = select(element)
                            .append('svg')
                                .style('width', svgWidth).style('height', svgHeight);
/*
            let clippath = svg.append('defs')
                                    .append('clippath')
                                        .attr('id', 'histogram-bars')
                                        .append('rect')
                                            .attr('x', 0)
                                            .attr('y', 0)
                                            .attr('width', clipWidth)
                                            .attr('height', clipHeight);
*/                                          
            // bars is defined at the top of the file since it is used in resize()
            // Each bar in the histogram defined here
            bars = svg.append('g')
                        .attr('id', 'barcontainer')
                        .attr('transform', 'translate(' + [((svgWidth - clipWidth)/2), ((svgHeight - clipHeight)/2)] + ')')
                    .selectAll('.bar')
                    .data(data)
                  .enter().append('rect')
                    .attr('class', 'bar')
                    .attr('width', x.bandwidth())
                    .attr('height', (d) => { return d.frequency * barHeight; })
                    .attr('x', (d) => { return x(d.leadtime); })
                    .attr('y', (d) => { return barContainerHeight - (d.frequency * barHeight); })
                    .attr('rx', 0)  // rounded edges 0 = sharp corners
                    .attr('ry', 0); // rounded edges 0 = sharp corners

            // Overlay Line
            let percentage = data.map((d) => { return d.percentage; });
            let minPercentage = min(percentage);
            let maxPercentage = max(percentage);

            log.debug('percentage', percentage);

            // new linear scale for the overlay line
            let yOverlay = scaleLinear()
                //                .domain([minPercentage, maxPercentage])
                                .range([barContainerHeight, 0]);
            let xOverlay = scaleLinear()
              //                  .domain([minLeadtime, maxLeadtime])
                                .range([0, barContainerWidth]);
            log.debug('yOverlay(13)', yOverlay(13));
            log.debug('yOverlay(25)', yOverlay(25));
            log.debug('x', xOverlay(2));

            let xy = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                 { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                 { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
            yOverlay.domain([min(xy.map((d) => { return d.y; })), max(xy.map((d) => { return d.y; }))]);
            xOverlay.domain([min(xy.map((d) => { return d.x; })), max(xy.map((d) => { return d.x; }))]);
            let path = line().x((d) => { return xOverlay(d.x);} )
                            .y((d) => { return yOverlay(d.y); });
           svg.append('g')
                    .attr('transform', 'translate(' + [((svgWidth - clipWidth)/2), ((svgHeight - clipHeight)/2)] + ')')
                    .attr('id', 'overlay')
                .append('path')
                    .datum(xy)
                    .attr('d', path); 
                                  

        }

    };

};
