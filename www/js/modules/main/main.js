import 'bootstrap';

import angular from 'angular';
import 'angular-ui-router';

import '../../modules/data/data';
import '../../modules/google/google';

import '../templates/templates';

import routes from './config/routes';

export default angular.module('main', ['app.templates', 'ui.router', 'google'])
    .config(routes)
    .constant('gSignInState', 'ls.main.auth.histogram')
    .constant('gSignOutState', 'ls.main.public')
    .run(() => {
        'ngInject';

        // $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        //     console.log('$stateChangeStart');
        //     console.log(arguments);
        // });
        //
        // $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
        //     console.log('$stateChangeError');
        //     console.log(arguments);
        // });
        //
        // $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        //     console.log('$stateChangeSuccess');
        //     console.log(arguments);
        // });
        //
        // $rootScope.$on('$viewContentLoaded',function(event){
        //     console.log('$viewContentLoaded');
        //     console.log(arguments);
        // });
        //
        // $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        //     console.log('$stateNotFound');
        //     console.log(arguments);
        // });

    });
