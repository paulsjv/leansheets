export default ($log, $rootScope, $state, gAuthService) => {
    'ngInject';

    return {

        replace: true,
        transclude: true,
        templateUrl: 'templates/google/_gSignIn.html',

        scope: {},
        bindToController: {},

        controllerAs: 'google',
        controller: class {

            constructor () {
                'ngInject';

                this.ready = false;

                gAuthService.getAuthentication().then((gAuth) => {
                    $rootScope.$apply(() => {

                        this.ready = true;
                        this.signedIn = gAuth.isSignedIn();
                        this.currentUser = gAuth.getCurrentUser();

                    });
                });

            }

            isReady() {
                return this.ready;
            }

            isSignedIn() {
                return this.signedIn;
            }

            getCurrentUser() {
                return this.currentUser;
            }

            signIn() {

                gAuthService.getAuthentication().then((gAuth) => {
                    gAuth.signIn().then(() => {
                        $rootScope.$apply(() => {

                            this.signedIn = gAuth.isSignedIn();
                            this.currentUser = gAuth.getCurrentUser();

                        });
                    });
                });

            }

            signOut() {

                gAuthService.getAuthentication().then((gAuth) => {
                    gAuth.signOut().then(() => {
                        $rootScope.$apply(() => {

                            this.signedIn = false;
                            this.currentUser = null;

                        });
                    });
                });

            }

        }

    };

};
