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
                auth: (gAuthService) => {
                    'ngInject';

                    return new Promise((resolve, reject) => {
                        gAuthService.getAuthentication().then((gAuth) => {

                            if (gAuth.isSignedIn()) {
                                resolve(gAuth);
                            } else {
                                reject({
                                    status: 401,
                                    message: 'No Authentication.'
                                });
                            }

                        });
                    });

                }

            }
        })
        .state('ls.main.auth.histogram', {
            url: '/histogram',
            views: {
                'content@ls': {
                    templateUrl: 'templates/main/_histogram.html'
                }
            }
        })
        .state('ls.main.public', {
            url: '/',
            views: {
                'content@ls': {
                    templateUrl: 'templates/main/_public.html'
                }
            }
        });

};
