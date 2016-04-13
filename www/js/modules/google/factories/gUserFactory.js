export default (gAuthResponseFactory, gBasicProfileFactory) => {
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
         * @returns {gAuthResponse}
         */
        getAuthResponse() {

            if (!this._authResponse) {
                this._authResponse = gAuthResponseFactory.create(this.googleUser.getAuthResponse());
            }

            return this._authResponse;

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

    }
    
}
