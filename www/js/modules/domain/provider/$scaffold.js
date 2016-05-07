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

        let scaffoldParentState = `${parentState}.domain`;

        this.$stateProvider
            .state(scaffoldParentState, {
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
            .state(`${scaffoldParentState}.list`, {
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
                                    });
                                });

                        });

                    }
                },
                controllerAs: '$ctrl',
                controller: class {

                    constructor($stateParams, DomainClass, instances, DomainUtils) {
                        'ngInject';

                        this.domainClass = $stateParams.domainClass;
                        this.DomainClass = DomainClass;
                        this.instances = instances;
                        this.DomainUtils = DomainUtils;

                        this.fields = DomainUtils.fields(DomainClass);
                        this.children = DomainUtils.children(DomainClass);

                    }

                    childFields(field) {
                        return this.DomainUtils.childFields(this.DomainClass, field);
                    }

                    titleize(str) {
                        return inflect.titleize(inflect.humanize(inflect.underscore(str.replace(/^\$/, ''))));
                    }
                    
                    pluralize(str) {
                        return inflect.pluralize(str);
                    }
                    
                    singularize(str) {
                        return inflect.singularize(str);
                    }

                }
            })
            .state(`${scaffoldParentState}.create`, {
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
            .state(`${scaffoldParentState}.instance`, {
                url: '/:id',
                templateUrl: 'templates/domain/pages/_scaffoldInstance.html',
                resolve: {
                    instance: (DomainClass, $stateParams) => {
                        'ngInject';

                        return new Promise((resolve, reject) => {

                            DomainClass.$get($stateParams.id)
                                .then((instance) => {
                                    resolve(instance);
                                })
                                .catch(() => {
                                    reject({
                                        status: 404,
                                        message: 'Not found.'
                                    });
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
