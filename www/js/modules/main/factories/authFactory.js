export default (gAuthService, $firebaseAuth, userFactory) => {
    'ngInject';

    return class Auth {

        /**
         * @param gAuth {gAuth}
         */
        constructor(gAuth) {
            this.gAuth = gAuth;
        }

        /**
         * @param gAuth {gAuth}
         * 
         * @returns {Auth}
         */
        static create(gAuth) {
            return new Auth(gAuth);
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

        /**
         * @returns {Promise}
         */
        signIn() {

            return new Promise((resolve, reject) => {
                
                this.gAuth.signIn().then(() => {
                    
                })
                
            });

        }

        /**
         * @returns {Promise}
         */
        signOut() {

            return new Promise((resolve, reject) => {
                resolve(this.gAuth.signOut());
            });

        }

    }

}
