'use strict';

/* jasmine specs for controllers go here */

describe('controlChartCtrl Tests', function(){
  
  	// add matcher
	beforeEach(function() {
		this.addMatchers({
			toEqualData: function(expected){
				return angular.equals(this.actual, expected);
			}
		});
	});

	// add global variables
	var $scope, $rootScope, $q, GoogleServiceMock, createController;

	// load the controller's module
	beforeEach(module('leanSheetsApp'));

	beforeEach(inject(function($injector) {
		$q = $injector.get('$q');
		// mock service that calls google spread sheets!
		GoogleServiceMock = {
			getUrl: function() {},
			getData: function(title, div) {
				var deferred = $q.defer();
				var promise = deferred.promise;

				//deferred.reject("Failed!"); 
				deferred.resolve("Success!");

				return promise;
			}
		}
	}));

	describe('controlChartCtrl test 1', function(){

		beforeEach(inject(function($injector) { 
			$rootScope = $injector.get('$rootScope');
			var $controller = $injector.get('$controller');

			$scope = $rootScope.$new();
			createController = function() { 
				return $controller('ControlChartCtrl', { '$scope': $scope, GoogleService: GoogleServiceMock }); 
			};
		}));

		it('should ....', inject(function() {
			var controller = createController();
			$scope.$digest();
			expect($scope.sheetdata).toEqual('Success!');
	    	expect('hello world!').toEqual('hello world!');
		}));

	});

});
