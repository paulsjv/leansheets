export default () => {
    'ngInject';

    return {

        templateUrl: 'templates/main/_header.html',

        scope: {},
        bindToController: {},

        controllerAs: 'header',
        controller: class {

            constructor ($log) {
                'ngInject';

                $log.debug('header');

            }

        }

    };

};
