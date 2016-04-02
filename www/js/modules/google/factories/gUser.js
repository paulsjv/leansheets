export default () => {
    'ngInject';

    return class gUser {

        constructor(googleUser) {
            this.googleUser = googleUser;
            this.basicProfile = this.googleUser.getBasicProfile();
        }

        static create(googleUser) {
            return new gUser(googleUser);
        }
        
        isSignedIn() {
            return this.googleUser.isSignedIn();
        }

        get email() {
            return this.basicProfile.getEmail();
        }

        get name() {
            return this.basicProfile.getName();
        }

        get firstName() {
            return this.basicProfile.getGivenName();
        }

        get lastName() {
            return this.basicProfile.getFamilyName();
        }

        get imageUrl() {
            return this.basicProfile.getImageUrl();
        }

    }

}
