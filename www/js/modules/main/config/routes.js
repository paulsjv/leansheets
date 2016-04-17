export default ($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $urlRouterProvider
        .otherwise('/histogram');

    $stateProvider
        .state('ls', {
            abstract: true,
            templateUrl: 'templates/layouts/main/_index.html',
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
                    templateUrl: 'templates/layouts/main/_header.html'
                },

                'footer': {
                    templateUrl: 'templates/layouts/main/_footer.html'
                }

            }
        })
        .state('ls.main.auth', {
            abstract: true,
            resolve: {
                restrict: (authService, authentication) => {
                    'ngInject';
                    return authService.authorize(authentication);
                }
            }
        })
        .state('ls.main.auth.histogram', {
            url: '/histogram',
            views: {
                'content@ls': {
                    templateUrl: 'templates/pages/_histogram.html'
                }
            }
        })
        .state('ls.main.public', {
            url: '/',
            views: {
                'content@ls': {
                    templateUrl: 'templates/pages/_public.html'
                }
            }
        });

};
