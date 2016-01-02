import ng from 'angular';
import google from './async/google';
import './leansheetsApplication';

var initInjector = ng.injector(['ng']),
	$http = initInjector.get('$http'),
	$log = initInjector.get('$log'),
	configFile = '/config.json';

// This corresponds with the promise you resolved in www/js/async/google.js
google.then(($google) => {
	$log.debug('main.js - Google jsapi loaded - Bootstraping Application');

	function bootstrapApplication() {
		$log.debug('main.js - Bootstraping Application');
		$log.debug('main.js - $google jsapi', $google);
		ng.module('google',[]).constant('$google', $google);
//        ng.module('moment',[]).constant('$moment', moment);
//        ng.module('jssha',[]).constant('$jssha', jssha);
		ng.bootstrap(document, ['leansheetsApplication']);
	}

	function fetchConfig() {
		$log.debug('main.js - Fetching Configuration');
		$log.debug('main.js - initInjector', initInjector);
		$log.debug('mian.js - $http', $http);
		return $http.get(configFile).then(
			function (response) {
				$log.debug('main.js - Loaded configuration file!', response.data);
				ng.module('config',[]).constant('CONFIG', response.data);
			}, function (error) {
				$log.error('main.js - There was an error loading the configuration file!', error);
		});
	}

	try {
		if (!window.jasmine) {
			fetchConfig().then(bootstrapApplication);
		}
	} catch (e) {
		// don't bootstrap more than once.
		console.log(e);
	}

});
