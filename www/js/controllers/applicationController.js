export default class {

	static get $inject() {
		return [ '$log','dataService' ];
	}

	constructor($log, dataService) {
        this.click = function() {
			$log.debug('applicationController.js - clicked!');
		};
	
		(function() {
			$log.debug('applicationController.js - building local storage');
            dataService.getData();
		})();		
	}
}
