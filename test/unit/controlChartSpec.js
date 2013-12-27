'use strict';

/* jasmine specs for controllers go here */

describe('controlChartCtrl Tests', function(){
  
	beforeEach(function() {
		this.addMatchers({
			toEqualData: function(expected){
				return angular.equals(this.actual, expected);
			}
		});
	});

	beforeEach(module('leanSheetsApp'));

	describe('controlChartCtrl test 1', function(){
		var scope, ctrl;

		beforeEach(inject(function($rootScope, $controller){
			scope = $rootScope.$new();
			ctrl = $controller('controlChartCtrl', {$scope: scope});
		}));

		it('should ....', inject(function() {
	    expect(scope.helloworld).toEqual('hello world!');
		}));

	});

});
