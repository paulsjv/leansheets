export default ($log, $rootScope, $state, gAuthService) => {
    'ngInject';

    let authentication;

    $rootScope.$on('gAuth.status.changed', (event, gAuth) => {
        authentication = gAuth;
    });

    return {

        restrict: 'EA',

        replace: true,
        transclude: true,

        templateUrl: 'templates/google/_gSignIn.html',

        controllerAs: 'auth',
        controller: class {

            constructor ($scope) {
                'ngInject';

                this.ready = false;

                gAuthService.getAuthentication().then((gAuth) => {
                    $scope.$apply(() => {
                        this.ready = true;
                        this.signedIn = gAuth.isSignedIn();
                    });
                });

                $scope.$watch(() => {
                    return authentication && authentication.isSignedIn();
                }, (newVal) => {
                    this.signedIn = newVal;
                });

            }

            isReady() {
                return this.ready;
            }

            isSignedIn() {
                return this.signedIn;
            }

            signIn() {
                gAuthService.signIn();
            }

        }

    };

};
