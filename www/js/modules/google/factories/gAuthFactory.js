export default (gUserFactory) => {
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
         * @returns {gUser}
         */
        getCurrentUser() {

            if (!this._currentUser) {
                this._currentUser = gUserFactory.create(this.googleAuth.currentUser.get());
            }

            return this._currentUser;

        }

        /**
         * @returns {Boolean}
         */
        isSignedIn() {
            return this.googleAuth.isSignedIn.get();
        }

    }

}
