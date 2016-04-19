import 'bootstrap';

import angular from 'angular';
import 'angular-ui-router';

import '../../modules/domain/domain';
import '../../modules/google/google';

import '../templates/templates';

import routes from './config/routes';
import firebaseData from './directives/firebaseData';
import histogramChart from './directives/histogramChart';
import signIn from './directives/signIn';
import authenticationFactory from './factories/authenticationFactory';
import onEvents from './run/onEvents';
import authService from './services/authService';
//import userFactory from './factories/userFactory';

export default angular.module('main', ['app.templates', 'domain', 'google', 'ui.router'])
    .config(routes)
    .constant('signInState', 'ls.main.auth.histogram')
    .constant('signOutState', 'ls.main.public')
    .directive('firebaseData', firebaseData)
    .directive('histogramChart', histogramChart)
    .directive('signIn', signIn)
    .factory('authenticationFactory', authenticationFactory)
//    .factory('userFactory', userFactory)
    .service('authService', authService)
    .run(onEvents);
