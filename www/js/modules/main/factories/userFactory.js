export default () => {
    'ngInject';
    
    return class User {

        /**
         * Factory method.
         * 
         * @param gUser {gUser}
         *
         * @returns {User}
         */
        static create(gUser) {
            return new User(gUser);
        }
        
        /**
         * @param gUser {gUser}
         */
        constructor(gUser) {
            this.gBasicProfile = gUser.getBasicProfile();
        }

        getEmail() {
            return this.gBasicProfile.getEmail();
        }

        getFullName() {
            return this.gBasicProfile.getName()
        }

        getFirstName() {
            return this.gBasicProfile.getGivenName();
        }

        getLastName() {
            return this.gBasicProfile.getFamilyName();
        }

        getImageUrl() {
            return this.gBasicProfile.getImageUrl();
        }

    }
    
}
