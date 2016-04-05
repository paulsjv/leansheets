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
    .run(($log, $rootScope, $state, gSignOutState) => {
        'ngInject';

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

            if (error && error.status) {

                event.preventDefault();

                switch (error.status) {
                    case 401:
                        $log.debug(`$stateChangeError ${JSON.stringify(error)}`);
                        $state.go(gSignOutState);
                        break;
                }

            }

        });

    });
