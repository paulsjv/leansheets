import * as d3 from '../support/d3';
import ChartUtils from '../support/ChartUtils';

export default class HistogramChartModel {

    constructor($elem, data) {

        debugger;
        this.$parent = d3.select($elem[0]);

        this.yAxisTicks = 5;

        this.resize();
        this.update(data);

    }

    resize() {

        this.svgHeight = this.$parent.node().getBoundingClientRect().height;
        this.svgWidth = this.$parent.node().getBoundingClientRect().width;

        this.histogramHeight = Math.round(this.svgHeight * 0.7);

        this.svgPaddingY = (this.svgHeight - this.histogramHeight) / 2;
        this.svgPaddingX = 60;

        this.histogramWidth = this.svgWidth - (this.svgPaddingX * 2);
        this.histogramBarSpacing = 0.62;

        this.lineOverlayWidth = this.histogramWidth;
        this.lineOverlayHeight = this.histogramHeight;

    }

    update(data) {

        this.data = data;

        this.histogramDomainMax = ChartUtils.calcHistogramDomainMax(this.data, this.yAxisTicks);

        this.histogramBarUnitHeight = this.histogramHeight / this.histogramDomainMax;

        this.histogramScaleBand = d3.scaleBand()
            .rangeRound([0, this.histogramWidth])
            .padding(this.histogramBarSpacing)
            .domain(this.data.map((datum) => datum.leadtime));

        this.histogramScaleLinear = d3.scaleLinear()
            .range([this.histogramHeight, 0])
            .domain([0, this.histogramDomainMax]);

        this.yAxisLeftTickInterval = this.histogramDomainMax / this.yAxisTicks;
        this.yAxisLeftTickValues = d3.range(0, this.histogramDomainMax + 1, this.yAxisLeftTickInterval);

        this.yAxisLeft = d3.axisLeft(this.histogramScaleLinear)
            .tickValues(this.yAxisLeftTickValues)
            .tickFormat((datum) => d3.format('.' + d3.precisionFixed(1) + 'f')(datum))
            .tickSizeInner(this.histogramWidth * -1);

        this.xAxisBottom = d3.axisBottom(this.histogramScaleBand);

        this.lineOverlayDomainMax = 100;

        this.lineOverlayScaleBand = this.histogramScaleBand.copy()
            .range([
                this.histogramScaleBand.range()[0] + (this.histogramScaleBand.bandwidth() / 2),
                this.histogramScaleBand.range()[1] + (this.histogramScaleBand.bandwidth() / 2)
            ]);

        this.lineOverlayScaleLinear = d3.scaleLinear()
            .range([this.lineOverlayHeight, 0])
            .domain([0, d3.max(this.data.map((datum) => { return datum.percentage; }))]);

        this.lineOverlay = d3.line().curve(d3.curveCardinal)
            .x((datum) => this.lineOverlayScaleBand(datum.leadtime))
            .y((datum) => this.lineOverlayScaleLinear(datum.percentage));

        this.yAxisRightTickInterval = this.lineOverlayDomainMax / this.yAxisTicks;
        this.yAxisRightTickValues = d3.range(0, this.lineOverlayDomainMax + 1, this.yAxisRightTickInterval);

        this.yAxisRight = d3.axisRight(this.lineOverlayScaleLinear)
            .tickValues(this.yAxisRightTickValues)
            .tickFormat((datum) => { return datum + '%'; });

    }

};
