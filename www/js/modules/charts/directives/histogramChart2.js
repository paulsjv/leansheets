export default ($log, $window, HistogramChartModelFactory) => {
    'ngInject';

    return {

        scope: {},
        bindToController: {
            dataset: '='
        },

        controllerAs: '$ctrl',
        controller: 'HistogramChartController',

        link: ($scope, $elem, attrs, ctrl) => {

            ctrl.draw(HistogramChartModelFactory.create($elem, ctrl.dataset));

            $scope.$on('$resize', () => {
                $log.debug('$resize called.');
                ctrl.resize();
            });

            $scope.$watch('$ctrl.dataset', (newDataset, oldDataset) => {
                
                if (newDataset !== oldDataset) {
                    $log.debug('$watchCollection called', newDataset);
                    ctrl.update(newDataset);
                }
                
            }, true);

        }

    };

};
