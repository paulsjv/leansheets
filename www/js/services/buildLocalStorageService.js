export default class BuildLocalStorageService {

	static get $inject() {
		return ['$log'];
	}

	constructor($log) {
		$log.debug('buildLocalStorageService.js - in constructor!');	
		this.buildLocalStorage = function() {
			$log.debug('buildLocalStorageService.js - in buildLocalStorage()!');
			return true;
		};
	}
}
