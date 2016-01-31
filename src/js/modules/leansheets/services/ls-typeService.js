/**
 * The services/ directory should only include angular service definitions.
 *
 * Naming Convention:
 *
 * 1. Always include `ls-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always include `Service` suffix
 *
 * i.e. ls-typeService.js
 */
define(['angular'], function (ng) {
    'use strict';

    return ['$log','$q','ls-googleService','ls-configService', function ($log, $q, googleService, configService) {
        var config = [];
        var sheetKey;

        this.getWorkTypes = function(sheet) {
            $log.debug('ls-typeService: getWorkTypes');
            var deferred = $q.defer(),
                promise = deferred.promise;

            if (isConfigAndSheetSet(sheet)) {
                googleService.getConfig(sheet).then(function(success) {
                    if (isConfigAndSheetSet(sheet)) {
                        resetConfig(sheet);
                        bootstrap(success);
                        deferred.resolve(config);
                    } else { deferred.resolve(config); }
                }, function(error) {
                    $log.error('TypeService: Error getting work types! ' + error);
                    deferred.reject(error);
                });
            } else {
                deferred.resolve(config);
            }

            return promise;
    	};

        var isConfigAndSheetSet = function(sheet) {
            return (config.length <= 0 || sheetKey != sheet);
        };

        var resetConfig = function(sheet) {
            sheetKey = sheet;
            config = [];
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
                        config.push({ name: line[column], column: line[column+1] });
                    }
                }
                column = column + 2;
            }

            if (configService.getShowAllWork()) {
                config.unshift({ name: "Show All Work Types", column: "showAllWork" });
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
