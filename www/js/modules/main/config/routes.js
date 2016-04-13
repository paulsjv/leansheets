export default ($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $urlRouterProvider
        .otherwise('/histogram');

    $stateProvider
        .state('ls', {
            abstract: true,
            templateUrl: 'templates/layouts/main/_index.html'
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
                authentication: ($log, authService) => {
                    'ngInject';

                    return new Promise((resolve, reject) => {

                        authService.getAuthentication().then((auth) => {
                            resolve(auth);
                        }, () => {
                            reject({
                                status: 401,
                                message: 'No Authentication.'
                            });
                        });

                    });
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
