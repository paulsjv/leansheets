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

export default angular.module('main', ['app.templates', 'domain', 'google', 'ui.router'])
    .config(routes)
    .constant('signInState', 'ls.main.auth.histogram')
    .constant('signOutState', 'ls.main.public')
    .directive('firebaseData', firebaseData)
    .directive('signIn', signIn)
    .factory('authenticationFactory', authenticationFactory)
    .service('authService', authService)
    .run(onEvents);
