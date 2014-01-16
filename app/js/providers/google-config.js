'use strict';

angular.module('dataServiceConfig', []).
  provider('DataServiceConfig', function() {
  		var url;
  		var query;
  		return {
  			setUrl: function(value) {
  				url = value;
  			},
  			setQuery: function(value) {
  				query = value;
  			},
  			$get: function() {
  				return {
  					gUrl: url,
  					gQuery: query
  				};
  			}
  		};
	});