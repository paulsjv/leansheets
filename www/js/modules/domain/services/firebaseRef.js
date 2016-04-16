import Firebase from 'firebase';

export default class FirebaseRef {

    constructor(firebaseUrl, $firebaseAuth, $firebaseObject, $firebaseArray) {
        'ngInject';

        this.firebaseUrl = firebaseUrl;

        this.$firebaseAuth = $firebaseAuth;
        this.$firebaseObject = $firebaseObject;
        this.$firebaseArray = $firebaseArray;

    }

    getAuthRef() {
        return this.$firebaseAuth(this.getRef());
    }

    getRef() {

        if (!this.ref) {
            this.ref = new Firebase(this.firebaseUrl);
        }

        return this.ref;

    }

}
