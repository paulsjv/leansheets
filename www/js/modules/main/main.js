import 'bootstrap';

import angular from 'angular';
import 'angular-ui-router';

import '../../modules/domain/domain';
import '../../modules/google/google';

import '../templates/templates';

import routes from './config/routes';
import currentUser from './directives/currentUser';
import firebaseData from './directives/firebaseData';
import signIn from './directives/signIn';
import authFactory from './factories/authFactory';
import userFactory from './factories/userFactory';
import onEvents from './run/onEvents';
import authService from './services/authService';

export default angular.module('main', ['app.templates', 'domain', 'google', 'ui.router'])
    .config(routes)
    .constant('signInState', 'ls.main.auth.histogram')
    .constant('signOutState', 'ls.main.public')
    .directive('currentUser', currentUser)
    .directive('firebaseData', firebaseData)
    .directive('signIn', signIn)
    .factory('authFactory', authFactory)
    .factory('userFactory', userFactory)
    .service('authService', authService)
    .run(onEvents);
