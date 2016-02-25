import { select } from 'd3-selection';

var log;

export default ($log) => {
    'ngInject';

    log = $log;

    return {
        scope: {},
        restrict: 'E',
        link: (scope, elm) => {
            log.debug('histogramChartDirective.js - in link!');
            log.debug('d3.select: ', select); 
            elm.text('myhistogram chart');
            select("histogram-chart")
                .append("svg")
                    .attr("width", 960)
                    .attr("height", 500)
              .append("g")
                    .attr("transform", "translate(20,20)")
              .append("rect")
                    .attr("width", 920)
                    .attr("height", 460);
        }

    }

}
