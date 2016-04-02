export default class gAuthService {

    constructor(g, gAuth) {

        this.g = g;
        this.gAuth = gAuth;

    }

    getAuthentication() {

        return new Promise((resolve, reject) => {
            this.g.then((gapi) => {
                gapi.auth2.getAuthInstance().then((googleAuth) => {
                    resolve(this.gAuth.create(googleAuth));
                }, reject);
            });
        });

    }

}
