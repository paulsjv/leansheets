export default class authService {

    constructor(authFactory, gAuthService, firebaseUrl, $firebaseAuth) {
        'ngInject';

        this.authFactory = authFactory;
        this.gAuthService = gAuthService;
        // this.auth = $firebaseAuth(new Firebase(firebaseUrl));

    }

    getAuthentication() {

        // return new Promise((resolve, reject) => {
        //     this.gAuthService.getAuthentication().then((gAuth) => {
        //         this.$firebaseAuth.getAuthentication(gAuth.getAccessToken()).then(() => {
        //
        //             resolve(gAuth);
        //
        //         }, reject);
        //     }, reject);
        // });

        return new Promise((resolve) => {
            this.gAuthService.getAuthentication().then((gAuth) => {
                resolve(this.authFactory.create(gAuth))
            });
        });

    }

    signIn() {
        return this.getAuthentication().then((auth) => {
            return auth.signIn();
        });
    }

    signOut() {
        return this.getAuthentication().then((auth) => {
            return auth.signOut();
        });
    }

}
