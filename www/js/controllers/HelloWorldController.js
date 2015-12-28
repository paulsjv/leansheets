export default class {

    static get $inject() {
        return ['$log'];
    }

    constructor ($log) {

        this.name = "World";

        $log.debug(this.name);

    }

}
