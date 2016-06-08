import * as d3 from '../support/d3';

export default class HistogramChartController {

    constructor() {
        'ngInject';

        this.$svg = null;
        this.$histogram = null;
        this.$lineOverlay = null;

        this.$yAxisLeft = null;
        this.$yAxisLeftLabel = null;
        this.$yAxisRight = null;
        this.$yAxisRightLabel = null;
        this.$xAxisBottom = null;
        this.$xAxisBottomLabel = null;

        // { leadtime: 10, frequency: 5 }
        this.xAxisDataProperty = 'leadtime';
        this.yAxisDataProperty = 'frequency';

    }

    draw(histogramChartModel) {

        if (!histogramChartModel) {
            throw new Error("histogramChartModel is a required parameter.");
        }

        this.histogramChartModel = histogramChartModel;
        this._draw();

    }

    resize() {

        if (!this.histogramChartModel) {
            throw new Error("HistogramChartController.resize() cannot be called before HistogramChartController.draw()")
        }

        this.histogramChartModel.resize();
        this._draw();
    }

    update(data) {

        if (!this.histogramChartModel) {
            throw new Error("HistogramChartController.update() cannot be called before HistogramChartController.draw()")
        }

        this.histogramChartModel.update(data);
        this._draw();

    }

    _draw() {

        if (!this.$svg) {

            this.$svg = this.histogramChartModel.$parent
                .append('svg')
                .attr('version', '1.1')
                .attr('xmlns', 'http://www.w3.org/2000/svg');

        }

        this.$svg
            .style('height', this.histogramChartModel.svgHeight)
            .style('width', this.histogramChartModel.svgWidth);

        this._drawHistogram();
        this._drawLineOverlay();

    }

    _drawHistogram() {

        this._drawAxisLeft();
        this._drawAxisBottom();

        this._drawTooltip();
        this._drawBars();

    }

    _drawAxisLeft() {

        if (!this.$yAxisLeft) {

            this.$yAxisLeft = this.$svg
                .append('g')
                .attr('class', 'axis axis-y axis-left');

        }

        if (!this.$yAxisLeftLabel) {

            this.$yAxisLeftLabel = this.$yAxisLeft
                .append('text')
                .attr('class', 'axis-text')
                .attr('visibility', 'hidden') // adding visibility: hidden prevents heights from changing mid-rendering.
                .text('Frequency');

        }

        this.$yAxisLeft
            .attr('transform', `translate(${this.histogramChartModel.svgPaddingX}, ${this.histogramChartModel.svgPaddingY})`)
            .call(this.histogramChartModel.yAxisLeft);

        let axisHeight = this.$yAxisLeft.node().getBBox().height,
            labelWidth = this.$yAxisLeftLabel.node().getBBox().width;

//        console.log(`axisLeft.axisHeight: ${axisHeight}`);
//        console.log(`axisLeft.labelWidth: ${labelWidth}`);

        this.$yAxisLeftLabel
            .attr('transform', `translate(-50, ${(axisHeight - labelWidth) / 2}) rotate(-90)`)
            .attr('visibility', 'visible');

    }

    _drawAxisBottom() {

        if (!this.$xAxisBottom) {

            this.$xAxisBottom = this.$svg
                .append('g')
                .attr('class', 'axis axis-x axis-bottom');

        }

        if (!this.$xAxisBottomLabel) {

            this.$xAxisBottomLabel = this.$xAxisBottom
                .append('text')
                .attr('class', 'axis-text')
                .attr('visibility', 'hidden') // adding visibility: hidden prevents heights from changing mid-rendering.
                .text('Lead Time');

        }

        this.$xAxisBottom
            .attr('transform', `translate(${this.histogramChartModel.svgPaddingX}, ${this.histogramChartModel.svgPaddingY + this.histogramChartModel.histogramHeight})`)
            .call(this.histogramChartModel.xAxisBottom);

        let axisWidth = this.$xAxisBottom.node().getBBox().width,
            labelWidth = this.$xAxisBottomLabel.node().getBBox().width;

        this.$xAxisBottomLabel
            .attr('transform', `translate(${(axisWidth - labelWidth )/ 2}, 35)`)
            .attr('visibility', 'visible');

    }

    _drawTooltip() {

        if (!this.$tooltip) {

            this.$tooltip = this.histogramChartModel.$parent
                .append('div')
                .attr('class', 'tooltip');

        }

    }

    _showTooltip() {

        return (datum) => {

            let coords = d3.mouse(d3.select('html').node()),
                offset = 10,
                x = coords[0] + offset,
                y = coords[1] + offset;

            this.$tooltip
                .style('visibility', 'visible')
                .style('left', x + 'px')
                .style('top', y + 'px')
                .html(`<b>Frequency: </b>${datum.frequency}<br/><b>Percentage: </b>${datum.percentage}%`);

        }

    }

    _hideTooltip() {

        return () => {

            this.$tooltip
                .style('visibility', 'hidden');

        }

    }

    _drawBars() {

        let that = this;

		// must remove histogram to update histogram
	    d3.select('#myHistogram123').remove();
		this.$histogram = null;
        if (!this.$histogram) {

            this.$histogram = this.$svg
                .append('g')
                .attr('class', 'histogram')
				.attr('id', 'myHistogram123');

        }

		let bars = this.$histogram
            .attr('transform', 'translate(' + [this.histogramChartModel.svgPaddingX, this.histogramChartModel.svgPaddingY] + ')')
            .selectAll('rect')
            .data(this.histogramChartModel.data);

		// have to separate out the enter() so that the update can happen otherwise it won't work correctly.
        bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('rx', 0)
            .attr('ry', 0)
            .style('height', (datum) => { // function gets called with custom `this` via fn.apply. lexical this does not apply, even with arrow function
                return datum[that.yAxisDataProperty] * that.histogramChartModel.histogramBarUnitHeight;
            })
            .style('width', that.histogramChartModel.histogramScaleBand.bandwidth())
            .attr('x', (datum) => { // function gets called with custom `this` via fn.apply. lexical this does not apply, even with arrow function
                return that.histogramChartModel.histogramScaleBand(datum[that.xAxisDataProperty]);
            })
            .attr('y', (datum) => { // function gest called with custom `this` via fn.apply. lexical this does not apply, even with arrow function
                return that.histogramChartModel.histogramHeight - (datum[that.yAxisDataProperty] * that.histogramChartModel.histogramBarUnitHeight) - 0.5;
            })
            .on('mousemove', this._showTooltip())
            .on('mouseout', this._hideTooltip());

    }

    _drawLineOverlay() {

        this._drawAxisRight();
        this._drawLine();

    }

    _drawAxisRight() {

        if (!this.$yAxisRight) {

            this.$yAxisRight = this.$svg
                .append('g')
                .attr('class', 'axis axis-y axis-right');

        }

        if (!this.$yAxisRightLabel) {

            this.$yAxisRightLabel = this.$yAxisRight
                .append('text')
                .attr('class', 'axis-text')
                .attr('visibility', 'hidden') // adding visibility: hidden prevents heights from changing mid-rendering.
                .text('Percentage of Total');

        }

        this.$yAxisRight
            .attr('transform', `translate(${this.histogramChartModel.svgPaddingX + this.histogramChartModel.lineOverlayWidth}, ${this.histogramChartModel.svgPaddingY})`)
            .call(this.histogramChartModel.yAxisRight);

        let axisHeight = this.$yAxisRight.node().getBBox().height,
            labelWidth = this.$yAxisRightLabel.node().getBBox().width;

//        console.log(`axisRight.axisHeight: ${axisHeight}`);
//        console.log(`axisRight.labelWidth: ${labelWidth}`);

        this.$yAxisRightLabel
            .attr('transform', `translate(50, ${(axisHeight - labelWidth) / 2}) rotate(90)`)
            .attr('visibility', 'visible');

    }

    _drawLine() {

        if (!this.$lineOverlay) {

            this.$lineOverlay = this.$svg
                .append('g')
                .attr('class', 'line-overlay');

            this.$lineOverlay
                .append('path')
                .attr('class', 'line');

        }

        this.$lineOverlay
            .attr('transform', `translate(${this.histogramChartModel.svgPaddingX}, ${this.histogramChartModel.svgPaddingY})`);

    }

}
