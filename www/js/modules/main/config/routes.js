export default ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $scaffoldProvider, SCAFFOLD_PARENT_STATE) => {
    'ngInject';

    $scaffoldProvider.install(SCAFFOLD_PARENT_STATE);
    
    $urlRouterProvider
        .when('', '/')
        .otherwise('/error/404');

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
                    templateUrl: 'templates/main/pages/_histogram.html',
                    resolve: {
                        data: () => [
                            {frequency: 2, percentage: 13, leadtime: 2},
                            {frequency: 5, percentage: 25, leadtime: 5},
                            {frequency: 13, percentage: 50, leadtime: 7},
                            {frequency: 3, percentage: 63, leadtime: 10},
                            {frequency: 1, percentage: 68, leadtime: 11},
                            {frequency: 4, percentage: 75, leadtime: 15},
                            {frequency: 2, percentage: 82, leadtime: 17},
                            {frequency: 2, percentage: 90, leadtime: 20},
                            {frequency: 1, percentage: 92, leadtime: 21},
                            {frequency: 12, percentage: 93, leadtime: 22},
                            {frequency: 11, percentage: 94, leadtime: 23},
                            {frequency: 10, percentage: 95, leadtime: 24},
                            {frequency: 3, percentage: 98, leadtime: 25},
                            {frequency: 1, percentage: 100, leadtime: 50}
                        ]
                    },
                    controllerAs: '$ctrl',
                    controller: class {
                        
                        constructor($log, data) {
                            'ngInject';
                            
                            this.data = data;
							this.$log = $log;
                            this.toggle = true; 
                        }

                        changeData() {
							this.$log.debug('changeData()');
							if (this.toggle) {
									this.data = [
										{frequency: 5, percentage: 10, leadtime: 3},
										{frequency: 2, percentage: 25, leadtime: 6},
										{frequency: 15, percentage: 50, leadtime: 9},
										{frequency: 1, percentage: 55, leadtime: 12},
										{frequency: 3, percentage: 59, leadtime: 15},
										{frequency: 7, percentage: 62, leadtime: 19},
										{frequency: 10, percentage: 68, leadtime: 20},
										{frequency: 5, percentage: 75, leadtime: 23},
										{frequency: 2, percentage: 80, leadtime: 26},
										{frequency: 3, percentage: 88, leadtime: 30},
										{frequency: 14, percentage: 98, leadtime: 44},
										{frequency: 8, percentage: 100, leadtime: 48}
									];
								this.toggle = false;
							}
							else {
								this.data = [
											{frequency: 2, percentage: 13, leadtime: 2},
											{frequency: 5, percentage: 25, leadtime: 5},
											{frequency: 13, percentage: 50, leadtime: 7},
											{frequency: 3, percentage: 63, leadtime: 10},
											{frequency: 1, percentage: 68, leadtime: 11},
											{frequency: 4, percentage: 75, leadtime: 15},
											{frequency: 2, percentage: 82, leadtime: 17},
											{frequency: 2, percentage: 90, leadtime: 20},
											{frequency: 1, percentage: 92, leadtime: 21},
											{frequency: 12, percentage: 93, leadtime: 22},
											{frequency: 11, percentage: 94, leadtime: 23},
											{frequency: 10, percentage: 95, leadtime: 24},
											{frequency: 3, percentage: 98, leadtime: 25},
											{frequency: 1, percentage: 100, leadtime: 50}
										];
								this.toggle = true;
							}
                        }
                        
                    }
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
