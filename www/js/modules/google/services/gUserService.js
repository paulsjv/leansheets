export default class gUserService {

    constructor() {
        'ngInject';
    }

    login(GoogleUser) {
        this.currentUser = GoogleUser;
    }

}
