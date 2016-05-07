import HistogramModel from './histogramModel';
import HistogramView from './histogramView';
import LineOverlayModel from './lineOverlayModel';
import { select, max, scaleBand } from 'www/js/modules/utils/d3';

let log, histogramModel, histogramView, lineOverlayModel;
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

export default class HistogramController {

    constructor($log) {
        log = $log;
        histogramModel      = new HistogramModel();
        histogramView       = new HistogramView();
        lineOverlayModel    = new LineOverlayModel();
    }

    setup(element, properties) {
        log.debug('HistogramController.setup');

        // Histogram Properties
        // set element where root svg is going to be attached to DOM
        histogramModel.rootElement          = element;

        // static properties passed
        histogramModel.svgHeight            = properties.svgHeight;
        histogramModel.barContainerHeight   = properties.barContainerHeight;
        histogramModel.margin               = properties.margin;
        histogramModel.padding              = properties.padding;
        histogramModel.ticks                = properties.ticks;

        // computed properties
        histogramModel.svgWidth             = computeSvgWidth(element);
        histogramModel.barContainerWidth    = computeBarContainerWidth(histogramModel.svgWidth, histogramModel.margin);

        // scales
        histogramModel.scaleBand = scaleBand()
                                    .rangeRound([0, histogramModel.barContainerWidth])
                                    .padding(histogramModel.padding); 

        // Line Overlay Properties
        lineOverlayModel.percentageTickMaxValue = properties.percentageTickMaxValue;

    }

    update(data) {
        log.debug('HistogramController.update');

        // computed properties
        histogramModel.setDomainMax     = computeDomainMax(data, histogramModel.ticks);
        histogramModel.setBarHeight     = histogramModel.barContainerHeight / histogramModel.domainMax;

        // update scale band domain
        histogramModel.scaleBand.domain(data.map((d) => { return d.leadtime; }));
    
        // draw the histogram 
        histogramView.draw(histogramModel);
        // draw line overlay
    }

    resize() {
        log.debug('HistogramController.resize');
    }
}
