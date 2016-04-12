export default ($log, $rootScope, $state, signInState, signOutState, authFactory) => {
    'ngInject';

    // tap into gAuth event to trigger auth event.
    // i.e., convert gAuth to generic Auth.
    $rootScope.$on('gAuth.status.changed', (event, gAuth) => {
        $rootScope.$apply(() => {
            $rootScope.$emit('auth.status.changed', authFactory.create(gAuth));
        });
    });

    // on auth status changed, do navigation.
    $rootScope.$on('auth.status.changed', (event, auth) => {

        if (auth.isSignedIn()) {
            $state.go(signInState);
        } else {
            $state.go(signOutState);
        }

    });

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
