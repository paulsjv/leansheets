export default class authService {

    constructor($log, authFactory, userFactory, gAuthService, firebaseRef) {
        'ngInject';

        this.$log = $log;
        this.authFactory = authFactory;
        this.userFactory = userFactory;

        this.gAuthService = gAuthService;
        this.firebaseAuth = firebaseRef.getAuth();

    }

    _authenticate() {
        return new Promise((resolve, reject) => {
            this.gAuthService.getAuthentication().then((gAuth) => {

                let accessToken = gAuth.getCurrentUser().getAuthResponse().getAccessToken();

                this.firebaseAuth.$authWithOAuthToken('google', accessToken).then((authData) => {
                    resolve(this.authFactory.create(gAuth, authData));
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
            this.gAuthService.signIn().then((gUser) => {

                this.clearAuthentication();
                resolve(this.userFactory.create(gUser));

            }, reject);
        });
    }

    /**
     * @returns {Promise}
     */
    signOut() {
        return new Promise((resolve, reject) => {
            this.gAuthService.signOut().then(() => {

                this.clearAuthentication();
                this.firebaseAuth.$unauth();

                resolve();

            }, reject);
        });
    }

}
