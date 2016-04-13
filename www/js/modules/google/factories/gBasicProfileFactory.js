export default () => {
    'ngInject';
    
    return class gBasicProfile {

        /**
         * Factory method.
         * @see https://developers.google.com/identity/sign-in/web/reference
         *
         * @param basicProfile {gapi.auth2.BasicProfile}
         *
         * @returns {gBasicProfile}
         */
        static create(basicProfile) {
            return new gBasicProfile(basicProfile);
        }
        
        /**
         * https://developers.google.com/identity/sign-in/web/reference
         *
         * @param basicProfile {gapi.auth2.BasicProfile}
         */
        constructor(basicProfile) {
            this.basicProfile = basicProfile;
        }

        /**
         * @returns {String}
         */
        getEmail() {
            return this.basicProfile.getEmail();
        }

        /**
         * @returns {String}
         */
        getName() {
            return this.basicProfile.getName();
        }

        /**
         * @returns {String}
         */
        getGivenName() {
            return this.basicProfile.getGivenName();
        }

        /**
         * @returns {String}
         */
        getFamilyName() {
            return this.basicProfile.getFamilyName();
        }

        /**
         * @returns {String}
         */
        getImageUrl() {
            return this.basicProfile.getImageUrl();
        }

    }
    
}
