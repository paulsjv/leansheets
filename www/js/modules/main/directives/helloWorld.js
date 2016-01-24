export default () => {

    return {

        template: "<div>{{ ctrl.greeting }} {{ ctrl.name }}!</div>",
        replace: true,

        scope: {},
        bindToController: {
            name: '@'
        },

        controllerAs: 'ctrl',
        controller: class {

            constructor ($log) {
                'ngInject';

                this.greeting = 'Hello';
                $log.debug(this.greeting);

            }

        }

    };

};
