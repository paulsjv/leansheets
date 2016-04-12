export default class gAuthService {

    constructor($rootScope, g, gAuthFactory) {
        'ngInject';

        g.then((gapi) => {
            gapi.auth2.getAuthInstance().then((googleAuth) => {

                googleAuth.isSignedIn.listen(() => {
                    $rootScope.$emit('gAuth.status.changed', gAuthFactory.create(googleAuth));
                });

            });
        });

        this.g = g;
        this.gAuthFactory = gAuthFactory;

    }

    getAuthentication() {

        return new Promise((resolve, reject) => {
            this.g.then((gapi) => {
                gapi.auth2.getAuthInstance().then((googleAuth) => {
                    resolve(this.gAuthFactory.create(googleAuth));
                }, reject);
            }, reject);
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
