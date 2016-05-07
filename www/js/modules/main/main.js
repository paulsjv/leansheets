import 'bootstrap';

import angular from 'angular';
import 'angular-ui-router';

import '../../modules/domain/domain';
import '../../modules/google/google';

import '../templates/templates';

import routes from './config/routes';
import firebaseData from './directives/firebaseData';
import signIn from './directives/signIn';
import authenticationFactory from './factories/authenticationFactory';
import onEvents from './run/onEvents';
import authService from './services/authService';
//import userFactory from './factories/userFactory';

// Histogram Chart
import histogramContainer from './components/histogram-container';
import filterContainer from './components/filter-container';
import histogramChart from './directives/histogram/histogramChart';
import histogramService from './directives/histogram/histogramService';
import histogramModel from './directives/histogram/histogramModel';
import histogramView from './directives/histogram/histogramView';
import lineOverlayModel from './directives/histogram/lineOverlayModel';

export default angular.module('main', ['app.templates', 'domain', 'google', 'ui.router'])
    .config(routes)
    .constant('SIGN_IN_STATE', 'ls.main.auth.histogram')
    .constant('SIGN_OUT_STATE', 'ls.main.public')
    .constant('ERROR_STATE', 'ls.main.error')
    .constant('SCAFFOLD_PARENT_STATE', 'ls.main.auth.admin')
    .directive('firebaseData', firebaseData)
    .directive('signIn', signIn)
    .factory('authenticationFactory', authenticationFactory)
//    .factory('userFactory', userFactory)
    .service('authService', authService)

    // Histogram Chart
    .component('histogramContainer', histogramContainer)
    .component('filterContainer', filterContainer)
    .directive('histogramChart', histogramChart)
    .service('histogramService', histogramService)
    .service('histogramModel', histogramModel)
    .service('histogramView', histogramView)
    .service('lineOverlayModel', lineOverlayModel)
   
    .run(onEvents);
