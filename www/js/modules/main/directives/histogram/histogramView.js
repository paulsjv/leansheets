import ToolTip            from 'www/js/modules/main/components/tooltip';
import {    select, selectAll, 
            mouse }       from 'www/js/modules/utils/d3';

var log;

/**
* getElementWidth()
* Gets the width of an svg element passed in rounded to the nearest 10s.
* @param element - object - svg element
* @returns integer - width in pixels
*/
let getElementWidth = (element) => {
    return parseInt(select(element).node().getBBox().width, 10);
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
* renderAxisBottom()
* Renders the SVG elements for the x-axis
* @param xAxis - object - d3 axisBottom object
*/
let renderAxisBottom = (svg, properties, model) => {
    select('#x-axis').remove();

    svg.append('g')
            .attr('id', 'x-axis')
            .attr('transform', 'translate(' + [model.margin.left, (model.margin.top + model.barContainerHeight)] + ')')
            .attr('class', 'axis axis--x')
        .call(model.axisBottom)
        .append('text')
            .attr('class', 'axis-text x-axis-text')
            .attr('visibility', 'hidden')
            .text('Lead Time');

    let leadtimeGroupWidth = getElementWidth('.axis--x');
    let leadtimeTextWidth = getElementWidth('.axis--x text.axis-text');

    select('.axis--x text.axis-text')
            .attr('transform', 'translate(' + ((leadtimeGroupWidth/2) - (leadtimeTextWidth/2)) + ', 35)')
            .attr('visibility', 'visible');
};

/**
*
*/
let renderAxisLeft = (svg, properites, model) => {
    select('#left-axis').remove();

    svg.append('g')
            .attr('id', 'left-axis')
            .attr('transform', 'translate(' + [model.margin.left, model.margin.top] + ')')
            .attr('class', 'axis axis--y axis-left')
        .call(model.axisLeft)
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
};

/**
* renderBars()
* Renders all the bars on the histogram chart. 
* @param data           - object - the data to render the bars with
* @param svg            - object - d3 selection that the group &lt;g&gt; will be appended to
* @param properties     - object - the object that holds all the other view properties for the bars 
* @param model          - object - the model passed into the view from calling class
*/
let renderBars = (data, svg, properties, model) => {
    // For updating remove the barcontainer from the DOM
    // TODO: see `selection.remove()` API documentation as removing the element from
    //      the DOM doesn't destroy it.  There maybe a memory leak here depending on
    //      how the browser handles DOM elements that are no longer attached.
    //      https://github.com/d3/d3-selection#modifying-elements
    //  As long as the element is not saved in a variable gc will destroy it.
    //      https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
    select('#' + properties.barContainerId).remove();

    // Add the barcontainer back to the DOM with the new data
    // Each bar in the histogram defined here
    let barsGroup = svg.append('g')
                    .attr('id', properties.barContainerId)
                    .attr('transform', 'translate(' + [model.margin.left, model.margin.top] + ')');

    // Bind data
    let bars = barsGroup.selectAll('rect').data(data);

    // Enter 
    bars.enter().append('rect')
        .attr('class', 'bar')
        .attr('rx', 0)  // rounded edges 0 = sharp corners
        .attr('ry', 0)  // rounded edges 0 = sharp corners
        .attr('height', (d) => { return d.frequency * model.barHeight; })
        .attr('width', model.scaleBand.bandwidth())
        .attr('x', (d) => { return model.scaleBand(d.leadtime); }) 
        .attr('y', (d) => { return model.barContainerHeight - (d.frequency * model.barHeight) - 0.5; })
      .on('mousemove', 
          function(d, i) {
                    properties.tooltip.show((mouse(select('html').node())[1] + 10) + 'px', (mouse(select('html').node())[0] + 10) + 'px', 
                              '<b>Frequency: </b>' + d.frequency + '<br/><b>Percentage: </b>' + d.percentage + '%');
          })
      .on('mouseout', 
          function(d, i) {
                    properties.tooltip.hide();
          });
      
};

/**
* renderBarText()
* This method will render the text that is shown right above each bar in the histogram.
* @param data - object - data for the histogram
* @param barHeight - integer - pixel height for one of the bars
*/    
let renderBarText = (data, svg, model) => {
    // For updating remove the barcontainer from the DOM
    // TODO: see `selection.remove()` API documentation as removing the element from
    //      the DOM doesn't destroy it.  There maybe a memory leak here depending on
    //      how the browser handles DOM elements that are no longer attached.
    //      https://github.com/d3/d3-selection#modifying-elements
    //  As long as the element is not saved in a variable gc will destroy it.
    //      https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
    select('#barcontainer-text').remove();

    // text on top of bars
    let barTextGroup = svg.append('g')
                    .attr('id', 'barcontainer-text')
                    .attr('transform', 'translate(' + [model.margin.left, model.margin.top] + ')');

    // Bind Data
    let barText = barTextGroup.selectAll('text').data(data);

    // Enter Text
    barText.enter().append('text')
            .attr('class', 'bar-text')
            .attr('y', (d) => { return model.barContainerHeight - (d.frequency * model.barHeight) - 3; })
            .text((d) => { return d.frequency; });

    selectAll('text.bar-text')
        .each(function(d) { 
                let barTextWidth = getElementWidth(this);
                select(this).attr('x', model.scaleBand(d.leadtime) + (model.scaleBand.bandwidth()/2) - (barTextWidth/2));
              });
 
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
let attachSvgElementToDom = (model) => {
    let svg = select('#' + model.svgId);
    if (!svg.empty()) { return svg; }

    return select(model.rootElement)
            .append('svg')
                .attr('id', model.svgId)
                .attr('version', '1.1')
                .attr('xmlns','http://www.w3.org/2000/svg')
                .style('height', model.svgHeight)
                .style('width', model.svgWidth);
};

export default class HistogramView {

    constructor($log) {
        log = $log;
        this.barProperties          = { tooltip: new ToolTip(log, 'tooltip'), 
                                        barContainerId: 'barcontainer' };
        this.axisBottomProperties   = {};
        this.axisLeftProperties     = {};
        this.svg                    = null;
        this.model                  = null;
    }

    setModel(model) {
        this.model = model;
    }

    /**
    * drawSvg()
    * Attaches the root svg element to the DOM
    * @param model - object - the chart model with it's properties
    */
    drawSvg() {
        this.svg = attachSvgElementToDom(this.model);
    }

    /**
    * drawAxisLeft()
    * Attaches the left axis to the DOM
    * @param model - object - the chart model with it's properties
    */
    drawAxisLeft() {
        renderAxisLeft(this.svg, this.axisLeftProperties, this.model);
    }

    /**
    * drawAxisBottom()
    * Attaches the bottom axis to the DOM
    * @param model - object - the chart model with it's properties
    */
    drawAxisBottom() {
        renderAxisBottom(this.svg, this.axisBottomProperties, this.model);
    }

    /**
    * drawToolTip()
    * Attaches the tooltip to the DOM
    */
    drawToolTip() {
        this.barProperties.tooltip.add();
    }

    /**
    * drawBars()
    * Attches the bars to the DOM
    * @params data  - object - the data the chart renders
    * @param model  - object - the chart model with it's properties
    */
    drawBars(data) {
        renderBars(data, this.svg, this.barProperties, this.model);        
    }

    drawBarText(data) {
        renderBarText(data, this.svg, this.model); 
    }

    resizeSvg() {
        this.svg.style('width', this.model.svgWidth);
    }

    resizeBars() {
        selectAll('rect.bar')
           .attr('width', this.model.scaleBand.bandwidth())
           .attr('x', (d) => { return this.model.scaleBand(d.leadtime); });
    }

    resizeBarText() {
        selectAll('.bar-text')
            .each(function(d) { 
                            let barTextWidth = getElementWidth(this);
                            select(this).attr('x', this.model.scaleBand(d.leadtime) + (this.model.scaleBand.bandwidth()/2) - (barTextWidth/2));
                          });
    }

    resizeAxisBottom() {
        select('.axis--x').call(this.model.axisBottom);
        let leadtimeGroupWidth = getElementWidth('.axis--x');
        let leadtimeTextWidth = getElementWidth('.axis--x text.axis-text');
     
        select('.axis--x text.axis-text')
            .attr('transform', 'translate(' + ((leadtimeGroupWidth/2) - (leadtimeTextWidth/2)) + ', 35)');
    }
    
    remove() {
        this.barProperties.tooltip.remove();
    }
}
