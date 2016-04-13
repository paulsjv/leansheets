import Firebase from 'firebase';

export default class FirebaseRef {

    constructor(firebaseUrl, $firebaseAuth) {
        'ngInject';

        this.ref = new Firebase(firebaseUrl);
        this.$firebaseAuth = $firebaseAuth;
        
    }

    getAuth() {
        return this.$firebaseAuth(this.ref);
    }
    
}
