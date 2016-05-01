function filterController($log) {
    'ngInject';

    this.name = 'Filter';

    this.setFilter = function(filter) {
        $log.debug('setFilter', filter);
        this.filter = filter;
        this.onFilterChange({ $event: { filter: filter } });
    }
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
}
