export default ($log, $rootScope, $state, gUser, gSignInState, gSignOutState) => {
    'ngInject';

    let initialized = false;

    return class gAuth {

        constructor(googleAuth) {

            this.googleAuth = googleAuth;

            if (!initialized) {

                initialized = true;

                googleAuth.isSignedIn.listen((signedIn) => {
                    $rootScope.$apply(() => {

                        if (signedIn) {
                            $state.go(gSignInState);
                        } else {
                            $state.go(gSignOutState);
                        }

                    });
                });

            }

        }

        static create(googleAuth) {
            return new gAuth(googleAuth);
        }

        isSignedIn() {
            return this.googleAuth.isSignedIn.get();
        }

        getCurrentUser() {
            return gUser.create(this.googleAuth.currentUser.get());
        }

        signIn() {
            return this.googleAuth.signIn();
        }

        signOut() {
            return this.googleAuth.signOut();
        }

    }

}
