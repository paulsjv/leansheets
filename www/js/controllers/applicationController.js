export default class {

	static get $inject() {
		return [ '$log','buildLocalStorageService' ];
	}

	constructor($log, buildLocalStorageService) {
		this.click = function() {
			$log.debug('applicationController.js - clicked!');
		};
	
		(function() {
			$log.debug('applicationController.js - building local storage');
			buildLocalStorageService.buildLocalStorage();
		})();		
	}
}
