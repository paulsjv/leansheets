import 'bootstrap';

import angular from 'angular';
import 'angular-ui-router';

import '../../modules/data/data';
import '../../modules/google/google';

import '../templates/templates';

import routes from './config/routes';

import header from './directives/header';
import footer from './directives/footer';
import layout from './directives/layout';

import layoutService from './services/layoutService';

export default angular.module('main', ['app.templates', 'ui.router', 'google'])
    .config(routes)
    .directive('header', header)
    .directive('footer', footer)
    .directive('layout', layout)
    .service('layoutService', layoutService)
    .run(() => {
        'ngInject';

        // $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        //     console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
        // });
        //
        // $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
        //     console.log('$stateChangeError - fired when an error occurs during transition.');
        //     console.log(arguments);
        // });
        //
        // $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        //     console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
        // });
        //
        // $rootScope.$on('$viewContentLoaded',function(event){
        //     console.log('$viewContentLoaded - fired after dom rendered',event);
        // });
        //
        // $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        //     console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
        //     console.log(unfoundState, fromState, fromParams);
        // });

    });
