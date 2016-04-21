import inflect from 'inflect';

export default class {
    
    constructor($stateProvider) {
        'ngInject';
        this.$stateProvider = $stateProvider;
    }
    
    $get() {
        throw Error("Use $scaffoldProvider during config phase only.");
    }
    
    install(parentState) {

        let scaffoldBaseState = `${parentState}.domain`;

        this.$stateProvider
            .state(scaffoldBaseState, {
                abstract: true,
                url: '/{domainClass:[a-zA-Z0-9\-]+}',
                template: '<div data-ui-view></div>',
                resolve: {
                    DomainClass: ($stateParams, $injector) => {
                        'ngInject';

                        return new Promise((resolve, reject) => {

                            let domainClassName = inflect.singularize(inflect.camelize(inflect.underscore($stateParams.domainClass))),
                                DomainClass = $injector.get(domainClassName);

                            if (DomainClass) {
                                resolve(DomainClass);
                            } else {
                                reject({
                                    status: 404,
                                    message: 'Not found.'
                                });
                            }

                        });

                    }
                }
            })
            .state(`${scaffoldBaseState}.list`, {
                url: '',
                templateUrl: 'templates/domain/pages/_scaffoldList.html',
                resolve: {
                    instances: (DomainClass) => {
                        'ngInject';

                        return new Promise((resolve, reject) => {

                            DomainClass.$all()
                                .then((instances) => {
                                    resolve(instances);
                                })
                                .catch(() => {
                                    reject({
                                        status: 404,
                                        message: 'Not found.'
                                    })
                                });

                        });

                    }
                },
                controllerAs: '$ctrl',
                controller: class {

                    constructor(instances) {
                        'ngInject';

                        this.instances = instances;

                    }

                }
            })
            .state(`${scaffoldBaseState}.create`, {
                url: '/create',
                templateUrl: 'templates/domain/pages/_scaffoldCreate.html',
                controllerAs: '$ctrl',
                controller: class {

                    constructor(DomainClass) {
                        'ngInject';

                        this.instance = new DomainClass();

                    }

                    create() {
                        this.instance.$save();
                    }

                }
            })
            .state(`${scaffoldBaseState}.instance`, {
                url: '/:id',
                templateUrl: 'templates/domain/pages/_scaffoldInstance.html',
                resolve: {
                    instance: (DomainClass, $stateParams) => {
                        'ngInject';

                        return new Promise((resolve, reject) => {

                            DomainClass.$get($stateParams.id)
                                .then((instance) => {
                                    resolve(instance)
                                })
                                .catch(() => {
                                    reject({
                                        status: 404,
                                        message: 'Not found.'
                                    })
                                });

                        });

                    }
                },
                controllerAs: '$ctrl',
                controller: class {

                    constructor(instance) {
                        'ngInject';
                        this.instance = instance;
                    }

                    save() {
                        this.instance.$save();
                    }

                }
            });
        
    }

}
