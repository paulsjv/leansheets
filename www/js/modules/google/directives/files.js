export default () => {
    'ngInject';

    return {

        templateUrl: 'templates/google/_files.html',

        scope: {},
        bindToController: {},

        controllerAs: 'files',
        controller: class {

            constructor ($log, gDriveService) {
                'ngInject';

                gDriveService.files.list().then((list) => {
                    $log.debug(list);
                }, (error) => {
                    $log.error(error);
                });

            }

        }

    };

};
