import angular from 'angular';

import filterContainer from './components/filterContainer';
import histogramContainer from './components/histogramContainer';
import tooltip from './components/tooltip';

import HistogramChartController from './controllers/HistogramChartController';

import histogramChart from './directives/histogramChart2';

import HistogramChartModelFactory from './factories/HistogramChartModelFactory';

import broadcastResize from './run/broadcastResize';

angular.module('ls.charts', [])
    
    .component('filterContainer', filterContainer)
    .component('histogramContainer', histogramContainer)
    .component('tooltip', tooltip)
    
    .controller('HistogramChartController', HistogramChartController)
    .directive('histogramChart', histogramChart)
    .factory('HistogramChartModelFactory', HistogramChartModelFactory)
    
    .run(broadcastResize);
