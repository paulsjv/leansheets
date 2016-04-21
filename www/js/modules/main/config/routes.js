export default ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $scaffoldProvider, SCAFFOLD_PARENT_STATE) => {
    'ngInject';
    
    $scaffoldProvider.install(SCAFFOLD_PARENT_STATE);
    $urlRouterProvider.otherwise('/error/404');
    
    $stateProvider
        .state('ls', {
            abstract: true,
            templateUrl: 'templates/main/layouts/_index.html',
            resolve: {
                authentication: ($log, authService) => {
                    'ngInject';
                    return authService.authenticate();
                }
            },
            controller: ($log, $scope, authentication, authService) => {
                'ngInject';

                $scope.authentication = authentication;

                $scope.$watch(() => authService.getAuthentication(), (authentication) => {
                    $scope.authentication = authentication;
                }, true);

            }
        })
        .state('ls.main', {
            abstract: true,
            views: {

                'header': {
                    templateUrl: 'templates/main/layouts/_header.html'
                },

                'footer': {
                    templateUrl: 'templates/main/layouts/_footer.html'
                }

            }
        })
        .state('ls.main.auth', {
            abstract: true,
            resolve: {
                signedIn: (authService, authentication) => {
                    'ngInject';
                    return authService.authorize(authentication);
                }
            }
        })
        .state('ls.main.auth.admin', {
            abstract: true,
            url: '/admin',
            views: {
                'content@ls': {
                    template: '<div data-ui-view></div>',
                    resolve: {
                        restrict: (authService, authentication) => {
                            'ngInject';
                            return authService.authorize(authentication, ['LS_ADMIN']);
                        }
                    }
                }
            }
        })
        .state('ls.main.auth.histogram', {
            url: '/histogram',
            views: {
                'content@ls': {
                    templateUrl: 'templates/main/pages/_histogram.html'
                }
            }
        })
        .state('ls.main.public', {
            url: '/',
            views: {
                'content@ls': {
                    templateUrl: 'templates/main/pages/_public.html'
                }
            }
        })
        .state('ls.main.error', {
            url: '/error/:status',
            params: {
                message: null
            },
            views: {
                'content@ls': {
                    templateUrl: 'templates/main/pages/_error.html',
                    controllerAs: '$ctrl',
                    controller: class {

                        constructor($stateParams) {
                            'ngInject';

                            this.status = $stateParams.status;
                            this.message = $stateParams.message;
                        }

                    }
                }
            }
        });

};
