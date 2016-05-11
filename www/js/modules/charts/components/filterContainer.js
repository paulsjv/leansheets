function filterController($log) {
    'ngInject';

    this.name = 'Filter';
    this.filter = 0;
    this.setFilter = function(filter) {
        $log.debug('setFilter', filter);
        this.filter = this.filter ? this.filter = 0 : this.filter = 1;
        this.onFilterChange({ $event: { filter: this.filter } });
    };
}

export default {
    template: `
        <div><button type="button" ng-click="$ctrl.setFilter({filter: 'filter clicked!'})">{{$ctrl.name}}</button>
    `,
    controller: filterController,
    bindings: {
        filter: '<',
        onFilterChange: '&'
    }
};
