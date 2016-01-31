export default class {

	constructor($log, dataService) {
        'ngInject';

        this.click = function() {
			$log.debug('applicationController.js - clicked!');
		};
	
		(function() {
			$log.debug('applicationController.js - building local storage');
            dataService.getData();
		})();		
	}
}
