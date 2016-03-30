export default ($log, $state, gUserService) => {
    'ngInject';

    return {

        replace: true,
        transclude: true,
        templateUrl: 'templates/google/_gLoginButton.html',

        scope: {},
        bindToController: {},

        controllerAs: 'google',
        controller: class {

            constructor($rootScope) {
                'ngInject';

                $rootScope.$watch(() => gUserService.currentUser, (newVal) => {
                    this.currentUser = newVal;
                });

            }

            isReady() {
                return this.isLoggedIn() !== undefined;
            }

            isLoggedIn() {
                return gUserService.isLoggedIn();
            }

            login() {
                gUserService.login();
            }

            logout() {
                gUserService.logout();
            }

        }

    };

};
