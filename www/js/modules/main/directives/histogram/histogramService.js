import HistogramView                from './histogramView';
import LineOverlayView              from './lineOverlayView';
import { select, max, scaleBand }   from 'www/js/modules/utils/d3';

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
* HistogramService
* This service creates and coordinates all the properties of the histogram
* chart and provides an interface for setting up, updating, and resizing the
* chart for the calling parent.
*/
export default class HistogramService {

    constructor($log) {
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

        // static properties passed
        this.histogramModel.svgHeight            = properties.svgHeight;
        this.histogramModel.barContainerHeight   = properties.barContainerHeight;
        this.histogramModel.margin               = properties.margin;
        this.histogramModel.padding              = properties.padding;
        this.histogramModel.ticks                = properties.ticks;

        // computed properties
        this.histogramModel.svgWidth             = computeSvgWidth(element);
        this.histogramModel.barContainerWidth    = computeBarContainerWidth(this.histogramModel.svgWidth, this.histogramModel.margin);

        // scale band x-axis
        this.histogramModel.scaleBand = scaleBand()
                                    .rangeRound([0, this.histogramModel.barContainerWidth])
                                    .padding(this.histogramModel.padding); 

        // scale linear left y-axis


        // Line Overlay Properties
        this.lineOverlayModel.percentageTickMaxValue = properties.percentageTickMaxValue;

        // scale band overlay x-axis

        // scale linear right y-axis
    }

    update(data) {
        log.debug('HistogramController.update');

        // computed properties
        this.histogramModel.domainMax     = computeDomainMax(data, this.histogramModel.ticks);
        this.histogramModel.barHeight     = this.histogramModel.barContainerHeight / this.histogramModel.domainMax;

        // update scale band domain x-axis scale
        this.histogramModel.scaleBand.domain(data.map((d) => { return d.leadtime; }));
        // update x-axis

        // update left y-axis

        // update scale linear line overlay y-axis

        // update scale band line overlay x-axis

        // update right y-axis
    
        // draw the histogram 
        this.histogramView.draw(data, this.histogramModel);
        // draw line overlay
        this.lineOverlayView.draw(this.lineOverlayModel);
    }

    resize() {
        log.debug('HistogramController.resize');
    }
}
