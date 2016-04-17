export default ($log, $rootScope, $state, signInState, signOutState) => {
    'ngInject';

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

        if (error && error.status) {

            event.preventDefault();

            switch (error.status) {
                case 401:
                    $log.debug(`$stateChangeError ${JSON.stringify(error)}`);
                    $state.go(signOutState);
                    break;
            }

        }

    });

}
