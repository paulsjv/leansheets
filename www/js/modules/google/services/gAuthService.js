export default class gAuthService {

    constructor($log, $rootScope, g, gAuthFactory, gUserFactory) {
        'ngInject';

        g.then((gapi) => {
            gapi.auth2.getAuthInstance().then((googleAuth) => {

                googleAuth.isSignedIn.listen(() => {
                    $rootScope.$emit('gAuth.status.changed', gAuthFactory.create(googleAuth));
                });

            });
        });

        this.$log = $log;

        this.g = g;
        this.gAuthFactory = gAuthFactory;
        this.gUserFactory = gUserFactory;

    }

    _authenticate() {

        return new Promise((resolve, reject) => {
            this.g.then((gapi) => {
                gapi.auth2.getAuthInstance().then((googleAuth) => {

                    let gAuth = this.gAuthFactory.create(googleAuth);
                    gAuth.isSignedIn() ? resolve(gAuth) : reject();

                }, reject);
            }, reject);
        });

    }

    getAuthentication() {

        if (!this.auth) {
            this.auth = this._authenticate();
        }

        return this.auth;

    }

    clearAuthentication() {
        this.auth = null;
    }

    /**
     * @returns {Promise}
     */
    signIn() {

        return new Promise((resolve, reject) => {
            this.g.then((gapi) => {
                gapi.auth2.getAuthInstance().then((googleAuth) => {
                    googleAuth.signIn().then((googleUser) => {

                        this.clearAuthentication();
                        resolve(this.gUserFactory.create(googleUser));

                    }, reject);
                }, reject);
            }, reject);
        });

    }

    /**
     * @returns {Promise}
     */
    signOut() {
        return new Promise((resolve, reject) => {
            this.g.then((gapi) => {
                gapi.auth2.getAuthInstance().then((googleAuth) => {
                    googleAuth.signOut().then(() => {

                        this.clearAuthentication();
                        resolve();

                    }, reject);
                }, reject);
            }, reject);
        });
    }

}
