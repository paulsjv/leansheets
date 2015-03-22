/**
 * The services/ directory should only include angular service definitions.
 *
 * Naming Convention:
 *
 * 1. Always include `ls-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always include `Service` suffix
 *
 * i.e. configService.js
 */
define(['angular'], function (ng) {
    'use strict';

    return ['$log','$q','ls-googleService', function ($log, $q, googleService) {
        var config = [];

        this.getWorkTypes = function() {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (config.length <= 0) {
                googleService.getConfig().then(function(success) {
                    if (config.length <= 0) {
                        bootstrap(success);
                        deferred.resolve(config);
                    } else { deferred.resolve(config); }
                }, function(error) {
                    $log.error(error);
                    alert(error);
                    deferred.resolve(error);
                });
            } else {
                deferred.resolve(config);
            }

            return promise;
    	};

        var bootstrap = function (configCsv) {
            var lines = configCsv.split("\n");
            lines = popLastIndexOfArrayIfEmpty(lines);

            var columns = lines[0].split(",");
            var column = 0;
            //console.log("config: ", config);
            while (column < columns.length) {
                for(var i in lines) {
                    var line = lines[i].split(",");
                    if (line[column+1] != "" && line[column] != "") {
                        config.push({ name: line[column], column: line[column+1] });
                        //console.log("\tconfig: ", config);
                    } else if (line[column+1] === "" && line[column] != "") {
                        config.push({ name: "****" + line[column] + "****", column: line[column+1] });
                    }
                }
                column = column + 2;
            }
        };

        var popLastIndexOfArrayIfEmpty = function (arry) {
            	if (arry[arry.length] == "" || arry[arry.length] == null) {
          	    arry.pop();
      	  	}
        		return arry;
      	};

    }];
});
