function histogramController($log) {
    'ngInject';

    this.filter = 'hello world';
    // get this through the service
    this.data = [{ frequency: 2, percentage: 13, leadtime: 2 }, 
                { frequency: 5, percentage: 25, leadtime: 5 }, 
                { frequency: 13, percentage: 50, leadtime: 7 }, 
                { frequency: 3, percentage: 63, leadtime: 10 }, 
                { frequency: 1, percentage: 68, leadtime: 11 }, 
                { frequency: 4, percentage: 75, leadtime: 15 }, 
                { frequency: 2, percentage: 82, leadtime: 17 }, 
                { frequency: 2, percentage: 90, leadtime: 20 }, 
                { frequency: 1, percentage: 92, leadtime: 21 }, 
                { frequency: 12, percentage: 93, leadtime: 22 }, 
                { frequency: 11, percentage: 94, leadtime: 23 }, 
                { frequency: 10, percentage: 95, leadtime: 24 }, 
                { frequency: 3, percentage: 98, leadtime: 25 }, 
                { frequency: 1, percentage: 100,leadtime: 50 }];

    this.switch = function(filter) {
        $log.debug('histogram-container.switch called', filter);
        this.data = [{ frequency: 4, percentage: 10, leadtime: 2 }, 
                { frequency: 5, percentage: 15, leadtime: 5 }, 
                { frequency: 8, percentage: 30, leadtime: 7 }, 
                { frequency: 3, percentage: 53, leadtime: 10 }, 
                { frequency: 1, percentage: 58, leadtime: 11 }, 
                { frequency: 4, percentage: 65, leadtime: 15 }, 
                { frequency: 2, percentage: 72, leadtime: 17 }, 
                { frequency: 3, percentage: 80, leadtime: 20 }, 
                { frequency: 1, percentage: 95, leadtime: 21 }, 
                { frequency: 1, percentage: 100,leadtime: 50 }];
    }
};

export default {
    template: '<div>{{$ctrl.data}}<filter-container filter="$ctrl.filter" on-filter-change="$ctrl.switch($event.filter)"></filter-container><histogram-chart data-set="$ctrl.data"></histogram-chart></div>',
    controller: histogramController
}
// <histogram-chart data-set="{{$ctrl.data}}"></histogram-chart>
