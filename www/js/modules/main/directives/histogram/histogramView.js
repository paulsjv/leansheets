import { select } from 'www/js/modules/utils/d3';

var log;

/**
* renderBars()
* Renders all the bars on the histogram chart. 
* @param data - object - the data to render the bars with
* @param svg - object - d3 selection that the group &lt;g&gt; will be appended to
* @param barContainerId - string - the value for the id html attribute for the bar container
* @param model - object - the model passed into the view from calling class
*/
let renderBars = (data, svg, barContainerId, model) => {
    // For updating remove the barcontainer from the DOM
    // TODO: see `selection.remove()` API documentation as removing the element from
    //      the DOM doesn't destroy it.  There maybe a memory leak here depending on
    //      how the browser handles DOM elements that are no longer attached.
    //      https://github.com/d3/d3-selection#modifying-elements
    //  As long as the element is not saved in a variable gc will destroy it.
    //      https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
    select('#'+barContainerId).remove();

    // Add the barcontainer back to the DOM with the new data
    // Each bar in the histogram defined here
    let barsGroup = svg.append('g')
                    .attr('id', barContainerId)
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
      .on('mousemove', function() {})
//          function(d, i) {
//                    tooltipShow((mouse(select('html').node())[1] + 10) + 'px', (mouse(select('html').node())[0] + 10) + 'px', 
//                              '<b>Frequency: </b>' + d.frequency + '<br/><b>Percentage: </b>' + d.percentage + '%');
//          })
      .on('mouseout', function() {});
//          function(d, i) {
//                    tooltipHide();
//          });
      
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
    let svg = select('#svgTop');
    if (!svg.empty()) { return svg; }

    return select(model.rootElement)
            .append('svg')
                .attr('id', 'svgTop')
                .attr('version', '1.1')
                .attr('xmlns','http://www.w3.org/2000/svg')
                .style('height', model.svgHeight)
                .style('width', model.svgWidth);
};

export default class HistogramView {

    constructor($log) {
        log = $log;
        this.barContainerId = 'barcontainer';
        this.model  = null;
        this.svg    = null;
    }

    draw(data, model) {
        // attach svg element to DOM
        this.svg = attachSvgElementToDom(model);
        // draw bars
        renderBars(data, this.svg, this.barContainerId, model);
        // draw x-axis

        // draw left y-axis

    }
}
