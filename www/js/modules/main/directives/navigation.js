export default () => {

    return {

        templateUrl: 'templates/main/_nav.html',
        replace: true,

        scope: {},
        bindToController: {},

        controllerAs: 'nav',
        controller: class {

            constructor ($log) {
                'ngInject';

                $log.debug('navigation');

            }

        }

    };

};
