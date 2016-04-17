export default ($log, gUserFactory) => {
    'ngInject';

    return class gAuth {

        /**
         * Factory method.
         * @see https://developers.google.com/identity/sign-in/web/reference
         *
         * @param googleAuth {gapi.auth2.GoogleAuth}
         *
         * @returns {gAuth}
         */
        static create(googleAuth) {
            return new gAuth(googleAuth);
        }

        /**
         * https://developers.google.com/identity/sign-in/web/reference
         *
         * @param googleAuth {gapi.auth2.GoogleAuth}
         */
        constructor(googleAuth) {
            this.googleAuth = googleAuth;
        }

        /**
         * @returns {Boolean}
         */
        isSignedIn() {
            return this.googleAuth.isSignedIn.get();
        }

        /**
         * @returns {gUser}
         */
        getCurrentUser() {

            if (!this._currentUser) {
                this._currentUser = gUserFactory.create(this.googleAuth.currentUser.get());
            }

            return this._currentUser;

        }

        signIn(options) {
            return this.googleAuth.signIn(options);
        }

        signOut() {
            return this.googleAuth.signOut();
        }

        disconnect() {
            return this.googleAuth.disconnect();
        }

        grantOfflineAccess(options) {
            return this.googleAuth.grantOfflineAccess(options);
        }

    }

}
