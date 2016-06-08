import 'bootstrap';

import angular from 'angular';
import 'angular-ui-router';
import 'angular-animate';

import '../charts/charts';
import '../domain/domain';
import '../google/google';
import '../inflect/inflect';
import '../templates/templates';

import debugInfo from './config/debugInfo';
import routes from './config/routes';

import firebaseData from './directives/firebaseData';
import signIn from './directives/signIn';

import authenticationFactory from './factories/authenticationFactory';
import onEvents from './run/onEvents';
import authService from './services/authService';
//  import userFactory from './factories/userFactory';

export default angular.module('ls.main', ['ls.templates', 'ls.charts', 'ls.domain', 'ls.google', 'ls.inflect', 'ui.router', 'ngAnimate'])

    .config(debugInfo)
    .config(routes)

    .constant('SIGN_IN_STATE', 'ls.main.auth.histogram')
    .constant('SIGN_OUT_STATE', 'ls.main.public')
    .constant('ERROR_STATE', 'ls.main.error')
    .constant('SCAFFOLD_PARENT_STATE', 'ls.main.auth.admin')

    .directive('firebaseData', firebaseData)
    .directive('signIn', signIn)

    .factory('authenticationFactory', authenticationFactory)
//     .factory('userFactory', userFactory)
    .service('authService', authService)
    
    .run(onEvents);
