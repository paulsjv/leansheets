import HistogramView                from '../directives/histogram/histogramView';
import LineOverlayView              from '../directives/histogram/lineOverlayView';
import { select, max, scaleBand,
         format, precisionFixed,
         scaleLinear, axisBottom,
         axisLeft, range,
         axisRight }   from 'www/js/modules/utils/d3';

let log;
/**
* computeSvgWidth()
* This method gets the pixel width of the element passed in rounded to the nearest 10s.
* @param element - object - html element
* @return integer - width in pixels
*/
let computeSvgWidth = (element) => {
    return parseInt(select(element).style('width'), 10);
};

/**
* computeeBarContainerWidth()
* Takes the svg width and the margin left and right width to return the total width of the 
* container holding the histogram bars.
* @param svgWidth - integer - pixels
* @param margin - object - holds the margins for the histogram chart
* @return integer - width of the container in pixels
*/
let computeBarContainerWidth = (svgWidth, margin) => {
    return svgWidth - (margin.left + margin.right);
};

/**
* computeDomainMax()
* This function finds the max frequency in the data that is passed in 
* in order to return the domain max so that there is always a tick that
* is above the max bar height (the mode) of the histogram.
* @param data { object }- the data set for the histogram
* @param ticks integer - the number of ticks on the chart
* @return integer - the number of ticks on the chart
*/
let computeDomainMax = (data, ticks) => {
    let frequency = data.map((d) => { return d.frequency; }),
        domainMax = max([max(frequency), ticks]),
        remainder = domainMax % ticks;

    if (remainder > 0 || domainMax === max(frequency)) {
        domainMax += (ticks - remainder);
    }
    return domainMax;
};

/**
* HistogramController
* This controller creates and coordinates all the properties of the histogram
* chart and provides an interface for setting up, updating, and resizing the
* chart for the calling parent.
*/
export default class HistogramController {

    constructor($log) {
        'ngInject';

        log = $log;
        this.histogramView       = new HistogramView(log);
        this.lineOverlayView    = new LineOverlayView(log);
        this.lineOverlayModel    = {};
        this.histogramModel      = {};
   }

    setup(element, properties) {
        log.debug('HistogramController.setup');

        // Histogram Properties
        // set element where root svg is going to be attached to DOM
        this.histogramModel.rootElement          = element;
        this.histogramModel.svgId                = 'svgTop';

        // static properties passed
        this.histogramModel.svgHeight            = properties.svgHeight;
        this.histogramModel.barContainerHeight   = properties.barContainerHeight;
        this.histogramModel.margin               = properties.margin;
        this.histogramModel.padding              = properties.padding;
        this.histogramModel.ticks                = properties.ticks;

        // computed properties
        this.histogramModel.svgWidth             = computeSvgWidth(this.histogramModel.rootElement);
        this.histogramModel.barContainerWidth    = computeBarContainerWidth(this.histogramModel.svgWidth, this.histogramModel.margin);

        // scale band x-axis
        this.histogramModel.scaleBand = scaleBand()
                                        .rangeRound([0, this.histogramModel.barContainerWidth])
                                        .padding(this.histogramModel.padding); 

        // scale linear left y-axis
        this.histogramModel.scaleLinear = scaleLinear()
                                            .range([this.histogramModel.barContainerHeight, 0]);

        // Line Overlay Properties
        this.lineOverlayModel.percentageTickMaxValue    = properties.percentageTickMaxValue;
        this.lineOverlayModel.svgId                     = this.histogramModel.svgId;
        this.lineOverlayModel.margin                    = this.histogramModel.margin;
        this.lineOverlayModel.barContainerWidth         = this.histogramModel.barContainerWidth;
        // scale linear right y-axis
        this.lineOverlayModel.scaleLinear               = scaleLinear()
                                                            .range([this.histogramModel.barContainerHeight, 0]);
    }

    update(data) {
        log.debug('HistogramController.update');

        // Histogram
        // computed properties
        this.histogramModel.domainMax     = computeDomainMax(data, this.histogramModel.ticks);
        this.histogramModel.barHeight     = this.histogramModel.barContainerHeight / this.histogramModel.domainMax;

        // update scale band domain x-axis scale
        this.histogramModel.scaleBand.domain(data.map((d) => { return d.leadtime; }));
        // update x-axis
        this.histogramModel.axisBottom  = axisBottom(this.histogramModel.scaleBand);

        // update left y-axis scale
        this.histogramModel.scaleLinear.domain([0, this.histogramModel.domainMax]);
        // update left y-axis
        this.histogramModel.axisLeft    = axisLeft(this.histogramModel.scaleLinear)
                            .tickValues(range(0, 
                                              this.histogramModel.domainMax + 1, 
                                              this.histogramModel.domainMax / this.histogramModel.ticks))
                            .tickFormat((d) => { return format('.' + precisionFixed(1) + 'f')(d); });

        // Line Overlay
        // update scale linear line overlay y-axis
        this.lineOverlayModel.scaleLinear.domain([0, max(data.map((d) => { return d.percentage; }))]);   
        // update scale band line overlay x-axis
        this.lineOverlayModel.scaleBand     = this.histogramModel.scaleBand.copy()
                                                    .range([ this.histogramModel.scaleBand.range()[0] + (this.histogramModel.scaleBand.bandwidth()/2), 
                                                             this.histogramModel.scaleBand.range()[1] + (this.histogramModel.scaleBand.bandwidth()/2) ]);
        // update right y-axis
        this.lineOverlayModel.axisRight     = axisRight(this.lineOverlayModel.scaleLinear)
                                                .tickValues(
                                                    range(0, this.lineOverlayModel.percentageTickMaxValue + 1, 
                                                             this.lineOverlayModel.percentageTickMaxValue / this.histogramModel.ticks))
                                                .tickFormat((d) => { return d + '%'; })
                                                .tickSize(-this.histogramModel.barContainerWidth);

        // set the model on the views
        this.histogramView.setModel(this.histogramModel);
        this.lineOverlayView.setModel(this.lineOverlayModel);

        // draw the histogram and overlay
        this.histogramView.drawSvg();
        this.histogramView.drawAxisLeft();
        this.histogramView.drawAxisBottom();
        this.lineOverlayView.drawAxisRight();
        this.histogramView.drawBars(data);
        this.lineOverlayView.drawLine(data);
        this.histogramView.drawBarText(data);
        this.histogramView.drawToolTip();
    }

    resize() {
        log.debug('HistogramController.resize');
        // update both models
        // computed properties
        this.histogramModel.svgWidth             = computeSvgWidth(this.histogramModel.rootElement);
        this.histogramModel.barContainerWidth    = computeBarContainerWidth(this.histogramModel.svgWidth, this.histogramModel.margin);
        this.lineOverlayModel.barContainerWidth = this.histogramModel.barContainerWidth;

        // resize x-axis scale band histogram range
        this.histogramModel.scaleBand.rangeRound([0, this.histogramModel.barContainerWidth]);
        // resize x-axis scale band line overlay range
        this.lineOverlayModel.scaleBand.rangeRound([ this.histogramModel.scaleBand.range()[0] + (this.histogramModel.scaleBand.bandwidth()/2),
                                                      this.histogramModel.scaleBand.range()[1] + (this.histogramModel.scaleBand.bandwidth()/2) ]);

        // set the model
        this.histogramView.setModel(this.histogramModel);
        this.lineOverlayView.setModel(this.lineOverlayModel);

        // resize the view
        // resize svg
        this.histogramView.resizeSvg();
        // resize bars
        this.histogramView.resizeBars();
        // resize bar text
        this.histogramView.resizeBarText();
        // resize x-axis
        this.histogramView.resizeAxisBottom();
        // resize right y-axis
        this.lineOverlayView.resizeAxisRight();
        // resize line
        this.lineOverlayView.resizeLine();
/*
    // get new width of parent node of svg width
//    let svgWidth = getSvgWidth(element);

    // update svg with new width
//    svg.style('width', svgWidth);

    // reset x range
//    let barContainerWidth = getBarContainerWidth(svgWidth, margin.left + margin.right); //getClipWidth(svgWidth));
//    x.rangeRound([0, barContainerWidth]);

    // update all bars
//    selectAll('rect.bar')
//        .attr('width', x.bandwidth())
//        .attr('x', (d) => { return x(d.leadtime); });

    // update bar-text
//    selectAll('.bar-text')
//        .each(function(d) { 
//                        let barTextWidth = getElementWidth(this);
//                        select(this).attr('x', x(d.leadtime) + (x.bandwidth()/2) - (barTextWidth/2));
//                      });


    // update x-axis
//    select('.axis--x').call(xAxis);
//    let leadtimeGroupWidth = getElementWidth('.axis--x');
//    let leadtimeTextWidth = getElementWidth('.axis--x text.axis-text');
 
//    select('.axis--x text.axis-text')
//        .attr('transform', 'translate(' + ((leadtimeGroupWidth/2) - (leadtimeTextWidth/2)) + ', 35)');

    // update xOverlay scaleBand.rangeRound
 //   xOverlay.rangeRound([ x.range()[0] + (x.bandwidth()/2), x.range()[1] + (x.bandwidth()/2) ]);

	// update yAxisRight tick size
	yAxisRight.tickSize(-barContainerWidth);
	select('.axis-right')
		.attr('transform', 'translate(' + [margin.left + barContainerWidth, margin.top] + ')')
		.call(yAxisRight);

    // update overlay line
    select('.overlay')
        .attr('d', overlayLine);
*/        
       
    }
}
