import HistogramChartModel from '../model/HistogramChartModel';

export default () => {
    'ngInject';

    return class HistogramChartModelFactory {
        
        static create($elem, data) {
            return new HistogramChartModel($elem, data);
        }

    };

};
