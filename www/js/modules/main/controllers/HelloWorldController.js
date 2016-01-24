export default class {

    constructor ($log) {
        'ngInject';

        this.name = "World";

        $log.debug(this.name);

    }

}
