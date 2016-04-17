export default ($log, $rootScope, authService) => {
    'ngInject';

    return {

        restrict: 'EA',

        replace: true,
        transclude: true,

        templateUrl: 'templates/directives/_signIn.html',

        scope: false,
        bindToController: {
            auth: '=signIn'
        },

        controllerAs: '$ctrl',
        controller: class {

            constructor ($scope) {
                'ngInject';

                $scope.signOut = () => authService.signOut();

                if (this.auth) {
                    $scope.currentUser = this.auth.getCurrentUser();
                }

                $scope.$watch(() => authService.getAuthentication(), (auth) => {
                    if (auth) {
                        $scope.currentUser = auth.getCurrentUser();
                    }
                }, true);

            }

            isSignedIn() {
                return this.auth && this.auth.isSignedIn();
            }

            signIn() {
                authService.signIn();
            }

        }

    };

};
