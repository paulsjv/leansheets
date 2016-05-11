import angular from 'angular';

var log; 

export default ($log, $window) => {
    'ngInject';

    log = $log;

    return {
        controller: 'HistogramController',
        controllerAs: '$ctrl',
        bindToController: {
            dataset: '='
        },
        scope: {},
        restrict: 'E',
        link: (scope, elm, attrs, ctrl) => {
            log.debug('HistogramDirective - histogramChart.js - in link!');

            // Resizing window logic
            angular.element($window).on('resize', () => { ctrl.resize(); });
            let svgHeight               = 400,                              // TODO: hardcoded
                barContainerHeight      = Math.round(svgHeight * 0.7),      // TODO: hardcoded to 70% of the svgHeight
                margin                  = { top: ((svgHeight - barContainerHeight)/2), 
                                            right: 60,                      // TODO: hardcoded
                                            bottom: ((svgHeight - barContainerHeight)/2), 
                                            left: 60 },                     // TODO: hardcoded
                padding                 = 0.62,                             // TODO: hardcoded
                ticks                   = 5,                                // TODO: hardcoded
                percentageTickMaxValue  = 100,                              // TODO: hardcoded
                properties = {
                    svgHeight:              svgHeight,
                    barContainerHeight:     barContainerHeight,
                    margin:                 margin,
                    padding:                padding,
                    ticks:                  ticks,
                    percentageTickMaxValue: percentageTickMaxValue
                };

            ctrl.setup(elm[0], properties);

            scope.$watchCollection('$ctrl.dataset', function() {
                log.debug('HistogramDirective - histogramChart.js - data set changed!');
                ctrl.update(ctrl.dataset);
            });

        }

    };

};
