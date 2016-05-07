export default () => {
    'ngInject';

    return class Authentication {

        /**
         * Factory method.
         * 
         * @param currentUser {User}
         *
         * @returns {Authentication}
         */
        static create(currentUser) {
            return new Authentication(currentUser);
        }
        
        /**
         * @param currentUser {User}
         */
        constructor(currentUser) {
            this.currentUser = currentUser;
        }

        /**
         * @returns {Promise}
         */
        getCurrentUser() {
            return this.currentUser;
        }

        /**
         * @returns {Boolean}
         */
        isSignedIn() {
            return !!this.currentUser;
        }

    };

};
