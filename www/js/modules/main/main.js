import 'bootstrap';

import angular from 'angular';
import 'angular-ui-router';
import 'angular-animate';

import '../../modules/domain/domain';
import '../../modules/google/google';
import '../../modules/inflect/inflect';

import '../templates/templates';

import filterContainer from './components/filter-container';
import histogramContainer from './components/histogram-container';

import debugInfo from './config/debugInfo';
import routes from './config/routes';

import HistogramController from './controllers/HistogramController';

import histogramChart from './directives/histogram/histogramChart';
import firebaseData from './directives/firebaseData';
import signIn from './directives/signIn';

import authenticationFactory from './factories/authenticationFactory';
import onEvents from './run/onEvents';
import authService from './services/authService';
//  import userFactory from './factories/userFactory';

import broadcastResize from './run/broadcastResize';
import onEvents from './run/onEvents';

import authService from './services/authService';

export default angular.module('main', ['app.templates', 'domain', 'google', 'inflect', 'ui.router', 'ngAnimate'])

    .component('histogramContainer', histogramContainer)
    .component('filterContainer', filterContainer)
    
    .config(debugInfo)
    .config(routes)
    
    .constant('SIGN_IN_STATE', 'ls.main.auth.histogram')
    .constant('SIGN_OUT_STATE', 'ls.main.public')
    .constant('ERROR_STATE', 'ls.main.error')
    .constant('SCAFFOLD_PARENT_STATE', 'ls.main.auth.admin')
    
    .controller('HistogramController', HistogramController)

    .directive('histogramChart', histogramChart)
    .directive('firebaseData', firebaseData)
    .directive('signIn', signIn)
    
    .factory('authenticationFactory', authenticationFactory)
//     .factory('userFactory', userFactory)
    .service('authService', authService)
    
    .run(broadcastResize)
    .run(onEvents)

    .service('authService', authService);
