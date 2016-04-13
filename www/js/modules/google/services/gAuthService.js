export default class gAuthService {

    constructor($log, $rootScope, g, gAuthFactory, gUserFactory) {
        'ngInject';

        g.then((gapi) => {

            gapi.auth2.getAuthInstance().isSignedIn.listen(() => {
                $rootScope.$emit('gAuth.status.changed', gAuthFactory.create(gapi.auth2.getAuthInstance()));
            });

        });

        this.$log = $log;

        this.g = g;
        this.gAuthFactory = gAuthFactory;
        this.gUserFactory = gUserFactory;

    }

    _authenticate() {

        return new Promise((resolve, reject) => {

            this.g
                .then((gapi) => this.gAuthFactory.create(gapi.auth2.getAuthInstance()))
                .then((gAuth) => {
                    gAuth.isSignedIn() ? resolve(gAuth) : reject();
                })
                .catch(reject);

        });

    }

    _flushAuth() {
        this.auth = null;
    }

    getAuthentication() {

        if (!this.auth) {
            this.auth = this._authenticate();
        }

        return this.auth;

    }

    /**
     * @returns {Promise}
     */
    signIn() {

        return new Promise((resolve, reject) => {

            this.g
                .then((gapi) => gapi.auth2.getAuthInstance().signIn())
                .then((googleUser) => {

                    this._flushAuth();
                    resolve(this.gUserFactory.create(googleUser));

                })
                .catch(reject);

        });

    }

    /**
     * @returns {Promise}
     */
    signOut() {

        return new Promise((resolve, reject) => {

            this.g
                .then((gapi) => gapi.auth2.getAuthInstance().signOut())
                .then(() => {

                    this._flushAuth();
                    resolve();

                })
                .catch(reject);

        });

    }

}
