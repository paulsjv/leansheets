import { select, curveCardinal,
         line } from 'www/js/modules/utils/d3';

var log;

let getSvgElement = (svg, id) => {
    return !svg ? select('#' + id) : svg; 
};

/**
* getElementHeight()
* Gets the hieght of an svg element passed in rounded to the nearest 10s.
* @param element - object - svg element
* @returns integer - height in pixels
*/
let getElementHeight = (elm) => {
    return parseInt(select(elm).node().getBBox().height, 10);
};

/**
* getElementWidth()
* Gets the width of an svg element passed in rounded to the nearest 10s.
* @param element - object - svg element
* @returns integer - width in pixels
*/
let getElementWidth = (element) => {
    return parseInt(select(element).node().getBBox().width, 10);
};

let renderLine = (data, svg, properties, model) => {
    select('#lineoverlay').remove();

    // Line function that is passed to the "p" element
    let lineOverlay = line().curve(curveCardinal)
                    .x((d) => { return model.scaleBand(d.leadtime); })
                    .y((d) => { return model.scaleLinear(d.percentage); });

    svg.append('g')
            .attr('id', 'lineoverlay')
            .attr('transform', 'translate(' + [model.margin.left, model.margin.top] + ')')
        .append('path')
            .attr('class','overlay')
            .datum(data)
            .attr('d', lineOverlay);
    
    return lineOverlay;
};

let renderAxisRight = (svg, properties, model) => {
    select('#right-axis').remove();

    svg.append('g')
            .attr('id', 'right-axis')
            .attr('transform', 'translate(' + [model.margin.left + model.barContainerWidth, model.margin.top] + ')')
            .attr('class', 'axis axis--y axis-right')
        .call(model.axisRight)
        .append('text')
            .attr('class', 'axis-text')
            .attr('visibility', 'hidden')
            .attr('dy', '.71em')
            .text('Percentage of Total');
    
    let percentGroupHeight = getElementHeight('.axis-right');
    let percentTextHeight = getElementWidth('.axis-right text.axis-text');

    select('.axis-right text.axis-text')
            .attr('transform', 'translate(50, ' + ((percentGroupHeight/2) - (percentTextHeight/2)) + ') rotate(90)')
            .attr('visibility', 'visible');
};

export default class LineOverlayView {

    constructor($log) {
        log = $log;
        this.model                  = null;
        this.svg                    = null;
        this.lineOverlay            = null;
        this.lineProperties         = {};
        this.axisRightProperties    = {};
    }

    setModel(model) {
        this.model = model;
    }

    drawLine(data) {
        this.svg = getSvgElement(this.svg, this.model.svgId);
        // draw line 
        this.lineOverlay = renderLine(data, this.svg, this.lineProperties, this.model);
    }

    drawAxisRight() {
        this.svg = getSvgElement(this.svg, this.model.svgId);
        // draw right y-axis
        renderAxisRight(this.svg, this.axisRightProperties, this.model);
    }

    resizeAxisRight() {
        yAxisRight.tickSize(-this.model.barContainerWidth);
        select('.axis-right')
            .attr('transform', 'translate(' + [this.model.margin.left + this.model.barContainerWidth, this.model.margin.top] + ')')
            .call(this.model.axisRight);
    }

    resizeLine() {
        select('.overlay')
            .attr('d', this.lineOverlay);
    }

    remove() {

    }
}
