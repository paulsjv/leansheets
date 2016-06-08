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

                    constructor($scope, $filter, $stateParams, DomainClass, instances, DomainUtils, $state) {
                        'ngInject';

                        this.DomainUtils = DomainUtils;
                        this.$state = $state;

                        this.DomainClass = DomainClass;
                        this.domainClass = $stateParams.domainClass;

                        this.all = instances;
                        this.instances = instances;

                        this.fields = DomainUtils.fields(DomainClass);
                        this.children = DomainUtils.children(DomainClass);

                        this.sort = 'id';
                        this.order = false; // true = desc, false = asc
                        this.offset = 0;
                        this.max = 10;

                        $scope.$watch('searchQuery', (newVal) => {

                            this.instances = $filter('filter')(instances, newVal);

                            if (this.instances.length <= this.offset) {
                                this.offset = 0;
                            }

                        });

                    }

                    childFields(field) {
                        return this.DomainUtils.childFields(this.DomainClass, field);
                    }

                    toInstance(id) {

                        this.$state.go('^.instance', {
                            id: id
                        });

                    }

                    newInstance() {
                        this.$state.go('^.create');
                    }

                    sortBy(sort) {

                        if (this.sort === sort) {
                            this.order = !this.order;
                        } else {
                            this.sort = sort;
                            this.order = false;
                        }

                    }

                    prev() {
                        this.offset = Math.max(this.offset - this.max, 0);
                    }

                    next() {

                        let nextOffset = this.offset + this.max,
                            numPages = Math.ceil(this.instances.length / this.max),
                            lastPageIndex = numPages - 1,
                            lastPageOffset = lastPageIndex * this.max;

                        this.offset = Math.min(nextOffset, lastPageOffset);

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
