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

        template: '<div class="g-profile" data-ng-transclude></div>',

        controller: class {

            constructor ($scope) {
                'ngInject';

                gAuthService.getAuthentication().then((gAuth) => {
                    $scope.$apply(() => {
                        $scope.profile = gAuth.getCurrentUser();
                    });
                });

                $scope.$watch(() => {
                    return authentication && authentication.isSignedIn();
                }, (newVal) => {

                    if (newVal) {
                        $scope.profile = authentication.getCurrentUser();
                    } else {
                        $scope.profile = null;
                    }

                });

            }

        }

    };

};
