export default class gUserService {

    constructor($log) {
        'ngInject';
    }

    login(GoogleUser) {
        this.currentUser = GoogleUser;
    }

}
