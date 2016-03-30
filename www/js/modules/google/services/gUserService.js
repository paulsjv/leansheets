export default class gUserService {

    constructor($log, $rootScope, g) {
        'ngInject';

        g.then((gapi) => {

            this.googleAuth = gapi.auth2.getAuthInstance();

            this.googleAuth.isSignedIn.listen((signedIn) => {
                $rootScope.$apply(() => {

                    if (!signedIn) {
                        this.currentUser = {};
                    }

                });
            });

            this.googleAuth.currentUser.listen((googleUser) => {

                let basicProfile = googleUser.getBasicProfile();

                $rootScope.$apply(() => {

                    if (basicProfile) {

                        this.currentUser = {
                            name: basicProfile.getName(),
                            firstName: basicProfile.getGivenName(),
                            lastName: basicProfile.getFamilyName(),
                            imageUrl: basicProfile.getImageUrl(),
                            email: basicProfile.getEmail()
                        };

                    }

                });

            });

        });

    }

    isLoggedIn() {
        if (this.googleAuth) {
            return this.googleAuth.isSignedIn.get();
        }
    }

    getCurrentUser() {
        if (this.googleAuth) {

            let googleUser = this.googleAuth.currentUser.get(),
                basicProfile = googleUser.getBasicProfile();

            return {
                name: basicProfile.getName(),
                firstName: basicProfile.getGivenName(),
                lastName: basicProfile.getFamilyName(),
                imageUrl: basicProfile.getImageUrl(),
                email: basicProfile.getEmail()
            }

        }
    }

    login() {

        if (this.googleAuth) {
            return this.googleAuth.signIn();
        } else {
            return Promise.reject('gapi.auth2 not initialized.');
        }

    }

    logout() {

        if (this.googleAuth) {
            return this.googleAuth.signOut();
        } else {
            return Promise.reject('gapi.auth2 not initialized.');
        }

    }

}
