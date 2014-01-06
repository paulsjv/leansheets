'use strict';

angular.module('googleConfig', []).
  provider('GoogleConfig', function() {
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