import { select, selectAll } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { min, max, extent } from 'd3-array';

var log, x, y, element, svg, bars, overlay, xAxis, yAxis;
var data = [{ frequency: 3, percentage: 13, leadtime: 2 }, 
            { frequency: 5, percentage: 25, leadtime: 5 }, 
            { frequency: 8, percentage: 50, leadtime: 7 }, 
            { frequency: 3, percentage: 63, leadtime: 10 }, 
            { frequency: 8, percentage: 68, leadtime: 11 }, 
            { frequency: 4, percentage: 75, leadtime: 15 }, 
            { frequency: 2, percentage: 82, leadtime: 17 }, 
            { frequency: 2, percentage: 90, leadtime: 20 }, 
            { frequency: 8, percentage: 92, leadtime: 21 }, 
            { frequency: 8, percentage: 98, leadtime: 25 }, 
            { frequency: 8, percentage: 100,leadtime: 50 }];


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

    // update x-axis
    select('.axis--x').call(xAxis);

    // update overlay line
    select('.overlay')
        .attr('d', overlay); 

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
            let margin = {  top:((svgHeight - clipHeight)/2), 
                            right:((svgWidth - clipWidth)/2),
                            bottom:((svgHeight - clipHeight)/2),
                            left:((svgWidth - clipWidth)/2) },
            padding = .62;

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
            x.padding(padding); // .58

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

            // Overlay Line
            let percentage = data.map((d) => { return d.percentage; });
            let minPercentage = min(percentage);
            let maxPercentage = max(percentage);

            // y is defined at top of file since it is used in resize()
            //      for responsive charting.
            // D3.js Y-Axis implemenation see:
            //      https://github.com/d3/d3-scale#linear-scales
            //      https://github.com/d3/d3-scale#continuous-scales
            y = scaleLinear()
                    .domain(extent(percentage)) //[minFrequency, maxFrequency])
                    .range([barContainerHeight, 0]);

            // Axises
            xAxis = axisBottom(x);//.tickValues(leadtime);
            yAxis = axisLeft(y).ticks(5);


            // Creating the svg and all the SVG elements for it.
            // svg is defined at the top of the file since it is used in resize()
            svg = select(element)
                            .append('svg')
                                .attr('version', '1.1')
                                .attr('xmlns','http://www.w3.org/2000/svg')
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
            svg.append('g')
                    .attr('transform', 'translate(' + [margin.left, (margin.top + barContainerHeight)] + ')')
                    .attr('class', 'axis axis--x')
                    .attr('zIndex', '2')
                .call(xAxis);

            svg.append('g')
                    .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
                    .attr('class', 'axis axis--y')
                    .attr('zIndex', '2')
                .call(yAxis)
                .append('text')
                    .attr('class', 'axis-text')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 6)
                    .attr('dy', '.71em')
                    .style('text-anchor', 'end')
                    .text('Percentage %');

           // bars is defined at the top of the file since it is used in resize()
            // Each bar in the histogram defined here
            bars = svg.append('g')
                        .attr('id', 'barcontainer')
                        .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
                        .attr('zIndex', '0.1')
                    .selectAll('.bar')
                    .data(data)
                  .enter().append('rect')
                    .attr('class', 'bar')
                    .attr('width', x.bandwidth())
                    .attr('height', (d) => { return d.frequency * barHeight; })
                    .attr('x', (d) => { return x(d.leadtime); })
                    .attr('y', (d) => { return barContainerHeight - (d.frequency * barHeight) - .5; })
                    .attr('rx', 0)  // rounded edges 0 = sharp corners
                    .attr('ry', 0); // rounded edges 0 = sharp corners

            // Line Overlay
            // Line start x-axis
            let overlayXstart = margin.left + Math.round((x.bandwidth() / 2));
            let xOverlay = x.copy();
            xOverlay.range([ x.range()[0] + (x.bandwidth()/2), x.range()[1] + (x.bandwidth()/2) ]);

            let yOverlay = scaleLinear()
                                .domain(extent(percentage))
                                .range([barContainerHeight - min(percentage), 0]);
            overlay = line().x((d, i) => { 
                                log.debug('Leadtime: '+ d.leadtime + ' Line x: ' + xOverlay(d.leadtime));
                                return xOverlay(d.leadtime);} )
                            .y((d) => { 
                                log.debug('Percentage: ' + d.percentage + ' Line y: ' + yOverlay(d.percentage));
                                return yOverlay(d.percentage); });
            svg.append('g')
                    .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
                .append('path')
                    .attr('class','overlay')
                    .datum(data)
                    .attr('d', overlay); 

        }

    };

};
