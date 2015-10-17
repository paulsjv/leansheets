export default() => {

    return {

        template: "<div>{{ ctrl.greet }} {{ ctrl.name }}</div>",
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

                this.greet = 'Hello';
                $log.debug(this.greet);

            }

        }

    };

};
