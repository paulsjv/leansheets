export default() => {

    return {

        template: "<div>{{ ctrl.greeting }} {{ ctrl.name }}!</div>",
        replace: true,

        scope: {},
        bindToController: {
            name: '@'
        },

        controllerAs: 'ctrl',
        controller: class {

            static get $inject() {
                return ['$log'];
            }

            constructor ($log) {

                this.greeting = 'Hello';
                $log.debug(this.greeting);

            }

        }

    };

};
