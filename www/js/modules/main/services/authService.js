export default class authService {

    constructor($log, authFactory, userFactory, gAuthService, firebaseRef) {
        'ngInject';

        this.$log = $log;
        this.authFactory = authFactory;
        this.userFactory = userFactory;

        this.gAuthService = gAuthService;
        this.firebaseAuth = firebaseRef.getAuthRef();

    }

    _authenticate() {

        return new Promise((resolve, reject) => {

            this.gAuthService.getAuthentication()
                .then((gAuth) => {

                    let accessToken = gAuth.getCurrentUser().getAuthResponse().getAccessToken()

                    return Promise.all([
                        Promise.resolve(gAuth),
                        this.firebaseAuth.$authWithOAuthToken('google', accessToken)
                    ]);

                })
                .then((authValues) => {

                    let gAuth = authValues[0],
                        authData = authValues[1];

                    resolve(this.authFactory.create(gAuth, authData));

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

            this.gAuthService.signIn()
                .then((gUser) => {

                    this._flushAuth();
                    resolve(this.userFactory.create(gUser));

                })
                .catch(reject);

        });

    }

    /**
     * @returns {Promise}
     */
    signOut() {

        return new Promise((resolve, reject) => {

            this.gAuthService.signOut()
                .then(() => {

                    this._flushAuth();
                    this.firebaseAuth.$unauth();

                    resolve();

                })
                .catch(reject);

        });

    }

}
