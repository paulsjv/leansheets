export default ($log, $rootScope, $state, SIGN_OUT_STATE, ERROR_STATE) => {
    'ngInject';

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

        if (error && error.status) {

            event.preventDefault();

            switch (error.status) {
                case 401:
                    $log.debug(`$stateChangeError ${JSON.stringify(error)}`);
                    $state.go(SIGN_OUT_STATE);
                    break;
                case 404:
                case 500:
                    $state.go(ERROR_STATE, error);
                    break;
            }

        }

    });

}
