import gAuth from '../model/gAuth';

export default class gAuthService {

    constructor($rootScope, $state, g, gSignInState, gSignOutState) {
        'ngInject';

        g.then((gapi) => {
            gapi.auth2.getAuthInstance().then((googleAuth) => {

                googleAuth.isSignedIn.listen(() => {

                    $rootScope.$apply(() => {
                        $rootScope.$emit('gAuth.status.changed', gAuth.create(googleAuth));
                    });

                });

            });
        });

        $rootScope.$on('gAuth.status.changed', (event, gAuth) => {

            if (gAuth.isSignedIn()) {
                $state.go(gSignInState);
            } else {
                $state.go(gSignOutState);
            }

        });

        this.g = g;

    }

    getAuthentication() {

        return new Promise((resolve, reject) => {
            this.g.then((gapi) => {
                gapi.auth2.getAuthInstance().then((googleAuth) => {
                    resolve(gAuth.create(googleAuth));
                }, reject);
            });
        });

    }

    signIn() {

        return new Promise((resolve, reject) => {
            this.getAuthentication().then((gAuth) => {
                resolve(gAuth.signIn());
            }, reject);
        });

    }

    signOut() {

        return new Promise((resolve, reject) => {
            this.getAuthentication().then((gAuth) => {
                resolve(gAuth.signOut());
            }, reject);
        });

    }

}
