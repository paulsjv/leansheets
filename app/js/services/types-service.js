angular.module('typesService',[]).service('TypesService',[function() {
	this.getWorkTypes = function() {
		return ["Frontend","Backend","Discovery","Defect"];
	};
}]);
