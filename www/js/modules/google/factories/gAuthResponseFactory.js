export default () => {
    'ngInject';
    
    return class gAuthResponse {

        /**
         * Factory method.
         * @see https://developers.google.com/identity/sign-in/web/reference
         *
         * @param authResponse {gapi.auth2.AuthResponse}
         *
         * @returns {gAuthResponse}
         */
        static create(authResponse) {
            return new gAuthResponse(authResponse);
        }
        
        /**
         * https://developers.google.com/identity/sign-in/web/reference
         *
         * @param authResponse {gapi.auth2.AuthResponse}
         */
        constructor(authResponse) {
            this.authResponse = authResponse;
        }

        /**
         * @returns {String}
         */
        getAccessToken() {
            return this.authResponse.access_token;
        }

        /**
         * @returns {String}
         */
        getIdToken() {
            return this.authResponse.id_token;
        }

        /**
         * @returns {String}
         */
        getLoginHint() {
            return this.authResponse.login_hint;
        }

        /**
         * @returns {String}
         */
        getScope() {
            return this.authResponse.scope;
        }

        /**
         * @returns {String}
         */
        getExpiresIn() {
            return this.authResponse.expires_in;
        }

        /**
         * @returns {String}
         */
        getFirstIssuedAt() {
            return this.authResponse.first_issued_at;
        }

        /**
         * @returns {String}
         */
        getExpiresAt() {
            return this.authResponse.expires_at;
        }

    }
    
}
