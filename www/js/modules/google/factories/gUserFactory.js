export default ($log, gAuthResponseFactory, gBasicProfileFactory) => {
    'ngInject';

    return class gUser {

        /**
         * Factory method.
         * @see https://developers.google.com/identity/sign-in/web/reference
         *
         * @param googleUser {gapi.auth2.GoogleUser}
         *
         * @returns {gUser}
         */
        static create(googleUser) {
            return new gUser(googleUser);
        }

        /**
         * https://developers.google.com/identity/sign-in/web/reference
         *
         * @param googleUser {gapi.auth2.GoogleUser}
         */
        constructor(googleUser) {
            this.googleUser = googleUser;
        }

        /**
         * @returns {String}
         */
        getId() {
            return this.googleUser.getId();
        }

        /**
         * @returns {Boolean}
         */
        isSignedIn() {
            return this.googleUser.isSignedIn();
        }

        /**
         * @returns {String}
         */
        getHostedDomain() {
            return this.googleUser.getHostedDomain();
        }

        /**
         * @returns {String}
         */
        getGrantedScopes() {
            return this.googleUser.getGrantedScopes();
        }

        /**
         * @returns {gBasicProfile}
         */
        getBasicProfile() {

            if (!this._profile) {
                this._profile = gBasicProfileFactory.create(this.googleUser.getBasicProfile());
            }

            return this._profile;

        }

        /**
         * @returns {gAuthResponse}
         */
        getAuthResponse() {

            if (!this._authResponse) {
                this._authResponse = gAuthResponseFactory.create(this.googleUser.getAuthResponse());
            }

            return this._authResponse;

        }

        /**
         * @param scopes {String} A space-delimited string of scopes.
         *
         * @returns {Boolean}
         */
        hasGrantedScopes(scopes) {
            return this.googleUser.hasGrantedScopes(scopes);
        }

        /**
         * @param options
         */
        signIn(options) {
            return this.googleUser.signIn(options);
        }

        /**
         * @param options
         */
        grant(options) {
            return this.googleUser.grant(options);
        }

        /**
         * @param scopes
         */
        grantOfflineAccess(scopes) {
            return this.googleUser.grantOfflineAccess(scopes);
        }

        disconnect() {
            return this.googleUser.disconnect();
        }

    }

}
