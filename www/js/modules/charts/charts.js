import angular from 'angular';

import filterContainer from './components/filterContainer';
import histogramContainer from './components/histogramContainer';
import tooltip from './components/tooltip';

import HistogramController from './controllers/HistogramController';

import histogramChart from './directives/histogramChart';

import broadcastResize from './run/broadcastResize';

angular.module('ls.charts', [])
    
    .component('filterContainer', filterContainer)
    .component('histogramContainer', histogramContainer)
    .component('tooltip', tooltip)
    
    .controller('HistogramController', HistogramController)
    
    .directive('histogramChart', histogramChart)
    
    .run(broadcastResize);
