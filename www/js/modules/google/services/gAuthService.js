export default class gAuthService {

    constructor($log, g, gAuthFactory, gUserFactory) {
        'ngInject';

        this.$log = $log;

        this.g = g;
        this.gAuthFactory = gAuthFactory;
        this.gUserFactory = gUserFactory;

    }

    getAuthInstance() {
        return this.g.then((gapi) => this.gAuthFactory.create(gapi.auth2.getAuthInstance()));
    }

    /**
     * @returns {Promise}
     */
    signIn() {
        return this.getAuthInstance().then((gAuth) => gAuth.signIn().then(() => gAuth));
    }

    /**
     * @returns {Promise}
     */
    signOut() {
        return this.g.then((gapi) => gapi.auth2.getAuthInstance().signOut());
    }

}
