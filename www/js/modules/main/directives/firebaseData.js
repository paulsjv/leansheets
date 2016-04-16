export default ($log, $rootScope, firebaseRef, $firebaseObject) => {
    'ngInject';

    return {

        restrict: 'EA',

        replace: true,
        transclude: true,

        templateUrl: 'templates/directives/_firebaseData.html',

        controller: class {

            constructor ($scope) {
                'ngInject';

                $scope.data = firebaseRef.getAuthRef().$getAuth();
                // $scope.data = $firebaseObject(firebaseRef.getRef().child('/settings'));

            }

            setData() {
                
            }

        }

    };

};
