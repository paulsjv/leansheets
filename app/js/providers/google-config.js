'use strict';

angular.module('dataServiceConfig', []).
  provider('DataServiceConfig', function() {
  		var url;
  		var query;
      var cfdStartDateQuery;
      var cfdEndDateQuery;
  		return {
  			setUrl: function(value) {
  				url = value;
  			},
  			setQuery: function(value) {
  				query = value;
  			}, 
        setCfdStartDateQuery: function(value) {
          cfdStartDateQuery = value;
        },
        setCfdEndDateQuery: function(value) {
          cfdEndDateQuery = value;
        },
  			$get: function() {
  				return {
  					gUrl: url,
  					gQuery: query,
            gCfdStartDateQuery: cfdStartDateQuery,
            gCfdEndDateQuery: cfdEndDateQuery
  				};
  			}
  		};
	});