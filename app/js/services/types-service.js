angular.module('typesService',[]).service('TypesService',[function() {
	this.getWorkTypes = function() {
		return ["Standard","Intangible","Discovery"];
	};
}]);
