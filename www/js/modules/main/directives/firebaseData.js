export default ($log, $rootScope, firebaseRef, $firebaseAuth, User) => {
    'ngInject';

    return {

        restrict: 'EA',

        replace: true,
        transclude: true,

        templateUrl: 'templates/directives/_firebaseData.html',

        controllerAs: 'ctrl',
        controller: class {

            constructor () {
                'ngInject';

                this.firebaseAuth = $firebaseAuth(firebaseRef);
                
                User.get(this.firebaseAuth.$getAuth().uid).then((data) => {
                    this.data = data;
                });
                // $scope.data = $firebaseObject(firebaseRef.getRef().child('/settings'));

            }

            setData() {

            }

        }

    };

};
