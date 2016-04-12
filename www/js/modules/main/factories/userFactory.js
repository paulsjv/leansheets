export default () => {
    'ngInject';
    
    return class User {

        /**
         * @param gUser {gUser}
         */
        constructor(gUser) {
            this.gBasicProfile = gUser.getBasicProfile();
        }

        /**
         * @param gUser {gUser}
         *
         * @returns {User}
         */
        static create(gUser) {
            return new User(gUser);
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
