'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('googleService', []).
	service("GoogleService", ['GoogleConfig', function(GoogleConfig) {
		this.getUrl = function () { return GoogleConfig.gUrl; }
	}]);
  
