angular.module('typesService',[]).service('TypesService',['DataService','$q', function(DataService, $q) {
    var config = [];
    var that = this;
    this.getWorkTypes = function() {
        var deferred = $q.defer();
        var promise = deferred.promise;
        
        if (config.length <= 0) {
            DataService.getConfig().then(function(success) {
                if (config.length <= 0) {
                    that.bootstrap(success);
                    deferred.resolve(config);
                } else { deferred.resolve(config); }
            }, function(error) {
                alert(error);
            });
            return promise;
        } else { 
            deferred.resolve(config);
            return promise; 
        }
	};

    this.bootstrap = function(configCsv) {
        var lines = configCsv.split("\n");
        lines = this.popLastIndexOfArrayIfEmpty(lines);

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
            //console.log("onfig: ", config);
        }
    };

    this.popLastIndexOfArrayIfEmpty = function (arry) {
        	if (arry[arry.length] == "" || arry[arry.length] == null) {
          	arry.pop();
  	  	}
    		return arry;
  	};

}]);
