angular.module('typesService',[]).service('TypesService',[function() {
	this.getWorkTypes = function() {
		return ["Service","Platform","Frontend","Backend","Discovery"];
	};
}]);
