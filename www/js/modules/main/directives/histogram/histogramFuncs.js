import { select, selectAll, mouse, matcher } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';
import { line, curveCardinal, curveBundle } from 'd3-shape';
import { range, min, max, extent } from 'd3-array';
import { format, precisionFixed } from 'd3-format';
import { transition, active } from 'd3-transition';

var log;

/**
* Global variables used throughout the file for setup, update, and resize
* Each variable is used in both update and resize 
*/
var margin = {},        // used in setup and resize functions
    x,                  // scaleBand - the scaleBand on the x-axis for each histogram bar
    barContainerHeight, // number of pixels the container that holds the bars of histogram
    bars;               // the rect html elements of the histogram

/**
* setupXScaleBand()
* This sets the range and padding for the histogram bars.
* @param maxRange - the width in pixels of the container the histogram bars are in.
* @param padding - the padding between each bar valid values [0 - .99]
* @returns the xScaleBand
*/
let setupXScaleBand = (maxRange, padding) => {
    // setup the x scaleBand for the histogram bars
    // domain is set in the update function
    let xScaleBand = scaleBand()
            .rangeRound([0, maxRange]);
    xScaleBand.padding(padding);
    return xScaleBand;
};

/**
* getSvgWidth()
* This method gets the pixel width of the element passed in rounded to the nearest 10s.
* @param element - object - html element
* @return integer - width in pixels
*/
let getSvgWidth = (element) => {
    return parseInt(select(element).style('width'), 10);
};

/**
* getElementWidth()
* Gets the width of an svg element passed in rounded to the nearest 10s.
* @param element - object - svg element
* @returns integer - width in pixels
*/
let getElementWidth = (elm) => {
    return parseInt(select(elm).node().getBBox().width, 10);
};

/**
* getBarContainerWidth()
* Takes the svg width and the margin left and right width to return the total width of the 
* container holding the histogram bars.
* @param svgWidth - integer - pixels
* @param margin - object - holds the margins for the histogram chart
* @return integer - width of the container in pixels
*/
let getBarContainerWidth = (svgWidth, margin) => {
    return svgWidth - margin.left + margin.right;
};

/**
* getDomainMax()
* This function finds the max frequency in the data that is passed in 
* in order to return the domain max so that there is always a tick that
* is above the max bar height (the mode) of the histogram.
* @param data { object }- the data set for the histogram
* @param ticks integer - the number of ticks on the chart
* @return integer - the number of ticks on the chart
*/
let getDomainMax = (data, ticks) => {
    let frequency = data.map((d) => { return d.frequency; }),
        domainMax = max([max(frequency), ticks]),
        remainder = domainMax % ticks;

    if (remainder > 0 || domainMax === max(frequency)) {
        domainMax += (ticks - remainder);
    }
    return domainMax;
};

/**
* renderSvgElement()
* Renders the &lt;svg&gt; element to the DOM and then returns the instance of it.
* If the &lt;svg&gt; element already is attached to the DOM it will return that instance
* and not create a new one.
* @param element - object - the html element to attach the &lt;svg&gt; element to
* @param height - integer - height in pixels
* @param width - integer - width in pixels
* @return object - a d3 selection object
*/
let renderSvgElement = (element, height, width) => {
    let svg = select('#svgTop');
    if (!svg.empty())
        return svg;

    return select(element)
            .append('svg')
                .attr('id', 'svgTop')
                .attr('version', '1.1')
                .attr('xmlns','http://www.w3.org/2000/svg')
                .style('height', height)
                .style('width', width);
};

/**
* renderBars()
* Renders all the bars on the histogram chart
* @param data - object - the data to render the bars with
* @param barHeight - integer - pixels for how tall one bar is
* @param svg - object - d3 selection that the group &lt;g&gt; will be appended to
*/
let renderBars = (data, barHeight) => {
    // Each bar in the histogram defined here
    // Bind the data
    // global variable
    // TODO: chart is not centered and clipped on the right side.
    bars = renderSvgElement().append('g')
                    .attr('id', 'barcontainer')
                    .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
                .selectAll('.bar')
                .data(data);

    // Update
    bars.enter().append('rect')
        .attr('class', 'bar')
        .attr('width', x.bandwidth())
        .attr('rx', 0)  // rounded edges 0 = sharp corners
        .attr('ry', 0);  // rounded edges 0 = sharp corners

    // All the values that change when the data set changes
   bars.enter().selectAll('rect.bar')
          .attr('height', (d) => { return d.frequency * barHeight; })
          .attr('x', (d) => { return x(d.leadtime); }) 
          .attr('y', (d) => { return barContainerHeight - (d.frequency * barHeight) - .5; })
        .on('mousemove', 
            function(d, i) {
//                    tooltipShow((mouse(select('html').node())[1] + 10) + 'px', (mouse(select('html').node())[0] + 10) + 'px', 
//                              '<b>Frequency: </b>' + d.frequency + '<br/><b>Percentage: </b>' + d.percentage + '%');
            })
        .on('mouseout',
            function(d, i) {
//                    tooltipHide();
            });

     bars.enter().append('text')
            .attr('class', 'bar-text')
            .attr('y', (d) => {return barContainerHeight - (d.frequency * barHeight) - 3; })
            .text((d) => { return d.frequency; });

    selectAll('.bar-text')
        .each(function(d) { 
                let barTextWidth = getElementWidth(this);
                select(this).attr('x', x(d.leadtime) + (x.bandwidth()/2) - (barTextWidth/2));
              });

    // Remove
        
};

/**
* Sets up all the static parts of the histogram chart
* @param data - the chart data
*/
export function setup(element, $log) {
    log = $log;
    // set right and left margins to be used in getting the barContainerWidth
    // global variable
    margin.right    = 60; // TODO: hardcoded for now
    margin.left     = 60; // TODO: hardcoded for now

    // setup svg element
    let svgWidth    = getSvgWidth(element),
        svgHeight   = 400,  // TODO: hardcoded for now
        barContainerWidth   = getBarContainerWidth(svgWidth, margin),
        padding     = .62;  // TODO: hardcoded for now
 
    // histogram bars are 70% the height of the svg element height 
    // global variable
    barContainerHeight  = Math.round(svgHeight * .7);   // TODO: get 70% of height hardcoded for now 

    // set top and bottom margins have getting barContainerHeight
    // global variable
    margin.top      = (svgHeight - barContainerHeight)/2;
    margin.bottom   = (svgHeight - barContainerHeight)/2; 

    // setup x scale band for histogram bars
    // global variable
    x = setupXScaleBand(barContainerWidth, padding);

    // Creating the svg and all the SVG elements for it.
    // svg is defined at the top of the file since it is used in resize()
    renderSvgElement(element, svgHeight, svgWidth);
};

/**
* Used to update all the dynamic parts of the historgam chart
* @param data - the chart data
*/
export function update(data) {
    let ticks   = 5,    // TODO: hardcoded for now
        domainMax = getDomainMax(data, ticks),
        barHeight = barContainerHeight / domainMax;

    x.domain(data.map((d) => { return d.leadtime; }));

    renderSvgElement();
    renderBars(data, barHeight);
};

/**
* resize()
* Called when the "window.resize" event is fired.  Used to resize the chart
* to make it responsive to the user's device.
*/
export function resize() {

};
