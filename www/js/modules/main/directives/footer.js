export default () => {
    'ngInject';
    
    return {

        templateUrl: 'templates/main/_footer.html',

        scope: {},
        bindToController: {},

        controllerAs: 'footer',
        controller: class {

            constructor ($log) {
                'ngInject';

                $log.debug('footer');

            }

        }

    };

};
