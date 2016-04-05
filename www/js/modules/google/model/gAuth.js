import gUser from './gUser';

export default class gAuth {

    constructor(googleAuth) {
        this.googleAuth = googleAuth;
    }

    static create(googleAuth) {
        return new gAuth(googleAuth);
    }

    getCurrentUser() {
        return gUser.create(this.googleAuth);
    }

    isSignedIn() {
        return this.googleAuth.isSignedIn.get();
    }

    signIn() {
        return this.googleAuth.signIn();
    }

    signOut() {
        return this.googleAuth.signOut();
    }

}
