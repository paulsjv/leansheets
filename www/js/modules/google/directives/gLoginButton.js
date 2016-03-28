export default ($log, $state, gApi, gScopes, gUserService) => {
    'ngInject';

    return {

        replace: true,
        transclude: true,
        templateUrl: 'templates/google/_gLoginButton.html',

        scope: {},
        bindToController: {},

        controllerAs: 'login',
        controller: class {

            constructor() {
                'ngInject';
            }

            getProfile() {
                return this.currentUser.getBasicProfile();
            }

            getName() {
                return this.getProfile().getName();
            }

            getEmail() {
                return this.getProfile().getEmail();
            }

            getImageUrl() {
                return this.getProfile().getImageUrl();
            }

        },
        link: (scope, elem, attrs, ctrl) => {

            scope.$watch(() => gUserService.currentUser, (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    ctrl.currentUser = gUserService.currentUser;
                }
            });

            gApi.then((google) => {

                google.signin2.render('gLogin', {

                    scope: gScopes.join(' '),

                    width: 180,
                    height: 30,

                    longtitle: true,
                    theme: 'dark',

                    onsuccess: (user) => {

                        scope.$apply(() => {

                            gUserService.login(user);
                            $state.go('main');

                        });

                    },

                    onfailure: () => {
                        console.log('failed?');
                    }

                });

            });

        }

    };

};
