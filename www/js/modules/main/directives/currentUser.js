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

        template: '<div class="current-user" data-ng-transclude></div>',

        controller: class {

            constructor ($scope) {
                'ngInject';

                authService.getAuthentication().then((auth) => {
                    $scope.$apply(() => {
                        $scope.currentUser = auth.getCurrentUser();
                    });
                }, () => {
                    $scope.currentUser = null;
                });

                $scope.$watch(() => {
                    return authentication && authentication.isSignedIn();
                }, (newVal) => {

                    if (newVal) {
                        $scope.currentUser = authentication.getCurrentUser();
                    } else {
                        $scope.currentUser = null;
                    }

                });

                $scope.signOut = () => authService.signOut();

            }

        }

    };

};
