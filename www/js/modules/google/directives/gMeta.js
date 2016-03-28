export default () => {
    'ngInject';

    return {
        
        replace: true,
        template: '<meta name="google-signin-client_id" content="{{ meta.clientId }}">',

        scope: {},
        bindToController: {},

        controllerAs: 'meta',
        controller: class {

            constructor (gClientId) {
                'ngInject';

                this.clientId = gClientId;

            }

        }

    };

};
