import { select, selectAll, mouse, matcher } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';
import { line, curveCardinal, curveBundle } from 'd3-shape';
import { range, min, max, extent } from 'd3-array';
import { format, precisionFixed } from 'd3-format';
import { transition, active } from 'd3-transition';

import { setup, update, resize } from './histogramFuncs';

var log, x, yOverlay, element, svg, margin, bars, overlayLine, xOverlay, xAxis, yAxisRight, barContainerHeight, barHeight;
/*
let resize = function() {
    // get new width of parent node of svg width
    let svgWidth = getSvgWidth(element);
    log.debug('directive resize width: ', svgWidth);

    // update svg with new width
    svg.style('width', svgWidth);

    // reset x range
    let barContainerWidth = getBarContainerWidth(svgWidth, margin.left + margin.right); //getClipWidth(svgWidth));
    x.rangeRound([0, barContainerWidth]);
    log.debug('bar continer width', barContainerWidth);
    log.debug('x.bandwidth()', x.bandwidth());

    // update all bars
    selectAll('rect.bar')
        .attr('width', x.bandwidth())
        .attr('x', (d) => { return x(d.leadtime); });

    // update bar-text
    selectAll('.bar-text')
        .each(function(d) { 
                        let barTextWidth = getElementWidth(this);
                        select(this).attr('x', x(d.leadtime) + (x.bandwidth()/2) - (barTextWidth/2));
                      });


    // update x-axis
    select('.axis--x').call(xAxis);
    let leadtimeGroupWidth = getElementWidth('.axis--x');
    let leadtimeTextWidth = getElementWidth('.axis--x text.axis-text');
 
    select('.axis--x text.axis-text')
        .attr('transform', 'translate(' + ((leadtimeGroupWidth/2) - (leadtimeTextWidth/2)) + ', 35)');

    // update xOverlay scaleBand.rangeRound
    xOverlay.rangeRound([ x.range()[0] + (x.bandwidth()/2), x.range()[1] + (x.bandwidth()/2) ]);

	// update yAxisRight tick size
	yAxisRight.tickSize(-barContainerWidth);
	select('.axis-right')
		.attr('transform', 'translate(' + [margin.left + barContainerWidth, margin.top] + ')')
		.call(yAxisRight);

    // update overlay line
    select('.overlay')
        .attr('d', overlayLine);

};
*/
let getSvgWidth = (elm) => {
    return parseInt(select(elm).style('width'), 10);
};

let getBarContainerWidth = (svgWidth, clipWidth) => {
    return svgWidth - clipWidth;
};

let getElementHeight = (elm) => {
    return parseInt(select(elm).node().getBBox().height, 10);
};

let getElementWidth = (elm) => {
    return parseInt(select(elm).node().getBBox().width, 10);
};

let removeElement = (elm) => {
    select(elm).remove();
};

let tooltipAdd = () => {
    select('body').append('div')
            .attr('class', 'tooltip');
};

let tooltipShow = (top, left, innerHtml) => {
    select('.tooltip')
            .style('visibility', 'visible')
            .style('top', top)
            .style('left', left)
            .html(innerHtml);
};

let tooltipHide = () => {
    select('.tooltip')
            .style('visibility', 'hidden');
};

let histogramController = function() {

};

let getLeadTime = (data) => {
    return data.map((d) => { return d.leadtime; });
};
/*
let update = (data, element) => {

    // update x scaleBand
    x.domain(getLeadTime(data));

    // Bind data
//    bars.data(data).enter();
    
    // Enter
     bars.selectAll('rect')
        .attr('height', (d) => { return d.frequency * barHeight; })
        .attr('x', (d) => { return x(d.leadtime); }) 
        .attr('y', (d) => { return barContainerHeight - (d.frequency * barHeight) - .5; });
};

let setup = (data) => {
    x = setupXscaleBand(data);
};

let setupXscaleBand = (data) => {
    let xScaleBand, padding = .62;
    // setup the x scaleBand for the histogram bars
    // domain is set in the update function
    xScaleBand = scaleBand()
//            .domain(getLeadTime(data))
            .rangeRound([0, barContainerWidth]);
    xScaleBand.padding(padding);
    return xScaleBand;

}
*/
export default ($log) => {
    'ngInject';

    log = $log;
    // Resizing window logic
    select(window).on('resize', resize);

    return {
        controller: histogramController,
        controllerAs: 'histogramController',
        bindToController: {
            dataset: '='
        },
        scope: {},
        restrict: 'E',
        link: (scope, elm, attrs, ctrl) => {
            log.debug('histogramChartDirective.js - in link!');

            setup(elm[0], log);

            scope.$watch('histogramController.dataset', function() {
                log.debug('data set changed!', ctrl.dataset);
                update(ctrl.dataset);
            });
/*
            let data = ctrl.dataset;
            log.debug('data', data);
           // element is defined at top of file
            element = elm[0];

            // add the tooltip div for mouse overs
            tooltipAdd();

            // svg properties
            let svgWidth = getSvgWidth(element),
                svgHeight = 400, // hard code for now
            // container for bars of historgram also margins
                clipHeight = Math.round(svgHeight * .7); // 70% of height
            // bar container 
            margin = { top:((svgHeight - clipHeight)/2),
                        right:60,
                        bottom:((svgHeight - clipHeight)/2),
                        left:60 };
	        let barContainerWidth = getBarContainerWidth(svgWidth, margin.left + margin.right);
            barContainerHeight = svgHeight - (svgHeight - clipHeight); 
		    let padding = .62,
            	ticks = 5;

            // Lead times for X-Axis
            // TODO: need to refactor to fuction to get lead times for enter/update
            let leadtime = getLeadTime(data);

            // x is defined at top of file since it is used in resize()
            //      for responsive charting.
            // D3.js X-Axis implemenation see:
            //      https://github.com/d3/d3-scale#band-scales
            // TODO: will need to update the scaleBand.domain on update
            x = scaleBand()
					.domain(leadtime)
					.rangeRound([0, barContainerWidth]);
            // Padding between bars both inner and outter padding
            x.padding(padding); // .58

            // Frequency for how tall each bar is on left Y-Axis
            // TODO: will need to update the frequency on update
            let frequency = data.map((d) => { return d.frequency; }),
                maxFrequency = max(frequency),
                minFrequency = min(frequency);

            // TODO: will need to update the domainMax on update
            let domainMax = max([max(frequency), ticks]),
                remainder = domainMax % ticks;

            if (remainder > 0 || domainMax === max(frequency)) {
                domainMax += (ticks - remainder);
            }

            // barHeight is defined at top of file since it is used to update the chart
            barHeight = barContainerHeight / domainMax;

            // Overlay Line
            // TODO: will need to update percentage on update
            let percentage = data.map((d) => { return d.percentage; });
            let minPercentage = min(percentage);
            let maxPercentage = max(percentage);

            // yOverlay is defined at top of file since it is used in resize()
            //      for responsive charting.
            // D3.js Y-Axis implemenation see:
            //      https://github.com/d3/d3-scale#linear-scales
            //      https://github.com/d3/d3-scale#continuous-scales
            // TODO: will need to update the scaleLinear.domain on update
            yOverlay = scaleLinear()
                    .domain([0, max(percentage)])
                    .range([barContainerHeight, 0]);

            // TODO: will need to update scaleLinear.domain on update
            let yFrequency = scaleLinear()
                    .domain([0, domainMax])
                    .range([barContainerHeight, 0]);
            // Axises
            // TODO: will need to update axisLeft with frequency and domainMax on update
            xAxis = axisBottom(x);
            let yAxisLeft = axisLeft(yFrequency)
                .tickValues(range(0, domainMax + 1, domainMax / ticks))
				.tickFormat((d) => { return format('.' + precisionFixed(1) + 'f')(d); });

            // TODO: will need to update axisRight on update
            let yPercentageTickMax = 100;
            yAxisRight = axisRight(yOverlay)
                .tickValues(range(0, yPercentageTickMax + 1, yPercentageTickMax / ticks))
                .tickFormat((d) => { return d + '%'; })
				.tickSize(-barContainerWidth);

            // Creating the svg and all the SVG elements for it.
            // svg is defined at the top of the file since it is used in resize()
            svg = select(element)
                            .append('svg')
                                .attr('id', 'svgTop')
                                .attr('version', '1.1')
                                .attr('xmlns','http://www.w3.org/2000/svg')
                                .style('width', svgWidth).style('height', svgHeight);

           svg.append('g')
                    .attr('transform', 'translate(' + [margin.left, (margin.top + barContainerHeight)] + ')')
                    .attr('class', 'axis axis--x')
                    .attr('zIndex', '2')
                .call(xAxis)
                .append('text')
                    .attr('class', 'axis-text x-axis-text')
                    .attr('visibility', 'hidden')
					.text('Lead Time');

            let leadtimeGroupWidth = getElementWidth('.axis--x');
            let leadtimeTextWidth = getElementWidth('.axis--x text.axis-text');
 
            select('.axis--x text.axis-text')
                    .attr('transform', 'translate(' + ((leadtimeGroupWidth/2) - (leadtimeTextWidth/2)) + ', 35)')
                    .attr('visibility', 'visible');

            svg.append('g')
                    .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
                    .attr('class', 'axis axis--y axis-left')
                    .attr('zIndex', '2')
                .call(yAxisLeft)
                .append('text')
                    .attr('class', 'axis-text')
                    .attr('visiblity', 'hidden')
                    .attr('y', 6)
                    .attr('dy', '.71em')
                    .style('text-anchor', 'end')
                    .text('Frequency');

            let frequencyGroupHeight = getElementHeight('.axis-left');
            let frequencyTextHeight = getElementWidth('.axis-left text.axis-text');
 
            select('.axis-left text.axis-text')
                    .attr('transform', 'translate(-50, ' + ((frequencyGroupHeight/2) - (frequencyTextHeight/2)) + ') rotate(-90)')
                    .attr('visibility', 'visible');

            svg.append('g')
                    .attr('transform', 'translate(' + [margin.left + barContainerWidth, margin.top] + ')')
                    .attr('class', 'axis axis--y axis-right')
                    .attr('zIndex', '2')
                .call(yAxisRight)
                .append('text')
                    .attr('class', 'axis-text')
                    .attr('visibility', 'hidden')
					.attr('dy', '.71em')
					.text('Percentage of Total');
            
            log.debug('.axis-right', select('.axis-right').node().getBBox().height);
            log.debug('.axis-right text.axis-text', select('.axis-right text.axis-text').node().getBBox().width);

            let percentGroupHeight = getElementHeight('.axis-right');
            let percentTextHeight = getElementWidth('.axis-right text.axis-text');
 
            select('.axis-right text.axis-text')
                    .attr('transform', 'translate(50, ' + ((percentGroupHeight/2) - (percentTextHeight/2)) + ') rotate(90)')
                    .attr('visibility', 'visible');

            // bars is defined at the top of the file since it is used in resize()
            // Each bar in the histogram defined here
            // Bind the data
            bars = svg.append('g')
                        .attr('id', 'barcontainer')
                        .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
                        .attr('zIndex', '0.1')
                    .selectAll('.bar')
                    .data(data).enter();
            
            // TODO: need to update bars on update
            bars.append('rect')
                    .attr('class', 'bar')
                    .attr('width', x.bandwidth())
                    .attr('height', (d) => { return d.frequency * barHeight; })
                    .attr('x', (d) => { return x(d.leadtime); })
                    .attr('y', (d) => { return barContainerHeight - (d.frequency * barHeight) - .5; })
                    .attr('rx', 0)  // rounded edges 0 = sharp corners
                    .attr('ry', 0)  // rounded edges 0 = sharp corners
                    .on('mousemove', 
                        function(d, i) {
                            tooltipShow((mouse(select('html').node())[1] + 10) + 'px', (mouse(select('html').node())[0] + 10) + 'px', 
                                      '<b>Frequency: </b>' + d.frequency + '<br/><b>Percentage: </b>' + d.percentage + '%');
                        })
                    .on('mouseout',
                        function(d, i) {
                            tooltipHide();
                        });

            // All the values that change when the data set changes
           bars.selectAll('rect')
                  .attr('height', (d) => { return d.frequency * barHeight; })
                  .attr('x', (d) => { return x(d.leadtime); }) 
                  .attr('y', (d) => { return barContainerHeight - (d.frequency * barHeight) - .5; });
            
             // TODO: will need to update the text on update
             bars.append('text')
                    .attr('class', 'bar-text')
                    .attr('y', (d) => {return barContainerHeight - (d.frequency * barHeight) - 3; })
                    .text((d) => { return d.frequency; });

            selectAll('.bar-text')
                .each(function(d) { 
                                let barTextWidth = getElementWidth(this);
                                select(this).attr('x', x(d.leadtime) + (x.bandwidth()/2) - (barTextWidth/2));
                              });

            // Line Overlay
            // Line start x-axis
            // TODO: will need to update xOverlay line
            xOverlay = x.copy();
            xOverlay.range([ x.range()[0] + (x.bandwidth()/2), x.range()[1] + (x.bandwidth()/2) ]);

            // Line start y-axis
            // Line function that is passed to the "p" element
            // TODO: will need to update overlayLine
            overlayLine = line().curve(curveCardinal)
                            .x((d) => { return xOverlay(d.leadtime); })
                            .y((d) => { return yOverlay(d.percentage); });

            // TODO: will need to update path
            svg.append('g')
                    .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
                .append('path')
                    .attr('class','overlay')
                    .datum(data)
                    .attr('d', overlayLine);
*/
        }

    };

};
