export default class authService {

    constructor($log, $state, signInState, signOutState, authenticationFactory, gAuthService, firebaseRef, $firebaseAuth, User) {
        'ngInject';

        this.$log = $log;

        this.$state = $state;
        this.signInState = signInState;
        this.signOutState = signOutState;

        this.authenticationFactory = authenticationFactory;

        this.gAuthService = gAuthService;
        this.firebaseAuth = $firebaseAuth(firebaseRef);

        this.User = User;

    }

    authenticate() {

        return new Promise((resolve) => {

            this.gAuthService.getAuthInstance()
                .then((gAuth) => {

                    let authData = this.firebaseAuth.$getAuth(),
                        accessToken = gAuth.getCurrentUser().getAuthResponse().getAccessToken();

                    if (!authData) {

                        return this.firebaseAuth.$authWithOAuthToken('google', accessToken)
                            .then((authData) => this.User.get(authData.uid))
                            .then((currentUser) => {
                                this.setAuthentication(this.authenticationFactory.create(currentUser));
                                return resolve(this.getAuthentication());
                            });

                    } else {

                        return this.User.get(authData.uid)
                            .then((currentUser) => {
                                this.setAuthentication(this.authenticationFactory.create(currentUser));
                                return resolve(this.getAuthentication());
                            });

                    }

                })
                .catch(() => {

                    this.setAuthentication(this.authenticationFactory.create());
                    return resolve(this.getAuthentication());

                });

        });

    }

    authorize(authentication) {
        
        let auth = this.getAuthentication() || authentication;
        
        return auth && auth.isSignedIn() ? Promise.resolve() : Promise.reject({
            status: 401,
            error: "Unauthorized."
        });

    }

    getAuthentication() {
        return this.auth;
    }

    setAuthentication(auth) {
        this.auth = auth;
    }

    /**
     * @returns {Promise}
     */
    signIn() {

        return new Promise((resolve, reject) => {

            this.gAuthService.signIn()
                .then((gAuth) => {

                    let accessToken = gAuth.getCurrentUser().getAuthResponse().getAccessToken();

                    return this.firebaseAuth.$authWithOAuthToken('google', accessToken);

                })
                .then((authData) => this.User.get(authData.uid))
                .then((currentUser) => {

                    this.setAuthentication(this.authenticationFactory.create(currentUser));
                    this.$state.go(this.signInState);

                    resolve(this.getAuthentication());

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

                    this.firebaseAuth.$unauth();

                    this.setAuthentication(this.authenticationFactory.create());
                    this.$state.go(this.signOutState);

                    resolve(this.getAuthentication());

                })
                .catch(reject);

        });

    }

}
