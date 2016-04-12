export default ($log, $rootScope, authService) => {
    'ngInject';

    let authentication;

    $rootScope.$on('auth.status.changed', (event, auth) => {
        authentication = auth;
    });

    return {

        restrict: 'EA',

        replace: true,
        transclude: true,

        templateUrl: 'templates/directives/_signIn.html',

        controllerAs: 'auth',
        controller: class {

            constructor ($scope) {
                'ngInject';

                this.ready = false;

                authService.getAuthentication().then((auth) => {
                    $scope.$apply(() => {
                        this.ready = true;
                        this.signedIn = auth.isSignedIn();
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
                authService.signIn();
            }

        }

    };

};
