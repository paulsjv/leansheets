'use strict';

angular.module('dataServiceConfig', []).
  provider('DataServiceConfig', function() {
        var configUrl;
        var configQuery;
        var url;
    	var query;
        var cfdStartDateQuery;
        var cfdEndDateQuery;
  		return {
            setConfigUrl: function(value) {
                configUrl = value;
            },
            setConfigQuery: function(value) {
                configQuery = value;
            },
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
                    gConfigUrl: configUrl,
                    gUrl: url,
                    gConfigQuery: configQuery,
  					gQuery: query,
                    gCfdStartDateQuery: cfdStartDateQuery,
                    gCfdEndDateQuery: cfdEndDateQuery
  				};
  			}
  		};
	});