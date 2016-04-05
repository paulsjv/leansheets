export default class gUser {

    constructor(googleAuth) {

        this.googleAuth = googleAuth;
        this.googleUser = googleAuth.currentUser.get();
        this.basicProfile = this.googleUser.getBasicProfile();
        
    }

    static create(googleAuth) {
        return new gUser(googleAuth);
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
    
    signOut() {
        return this.googleAuth.signOut();
    }
    
}
