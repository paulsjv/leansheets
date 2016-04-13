export default ($log, userFactory) => {
    'ngInject';

    return class Auth {

        /**
         * Factory method.
         * 
         * @param gAuth {gAuth}
         * @param authData {authData}
         *
         * @returns {Auth}
         */
        static create(gAuth, authData) {
            return new Auth(gAuth, authData);
        }
        
        /**
         * @param gAuth {gAuth}
         * @param authData {authData}
         */
        constructor(gAuth, authData) {
            this.gAuth = gAuth;
            this.authData = authData;
        }

        /**
         * @returns {User}
         */
        getCurrentUser() {

            if (!this._currentUser) {
                this._currentUser = userFactory.create(this.gAuth.getCurrentUser());
            }

            return this._currentUser;

        }

        /**
         * @returns {Boolean}
         */
        isSignedIn() {
            return this.gAuth.isSignedIn();
        }

    }

}
