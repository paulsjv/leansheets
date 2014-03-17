'use strict';

/* jasmine specs for controllers go here */

describe('cfdChartCtrl Tests', function(){
  
  	// add matcher
	beforeEach(function() {
		this.addMatchers({
			toEqualData: function(expected){
				return angular.equals(this.actual, expected);
			}
		});
	});

	// add global variables
	var $scope, $rootScope, $q, DataServiceMock, createController, $window;

	// load the controller's module
	beforeEach(module('leanSheetsApp'));

	beforeEach(inject(function($injector) {
		$q = $injector.get('$q');
		// mock service that calls google spread sheets!
		DataServiceMock = {
			getUrl: function() {},
			getData: function(title) {
				var deferred = $q.defer();
				var promise = deferred.promise;

				//deferred.reject("Failed!"); 
				deferred.resolve("Success!");

				return promise;
			},
			getCfdStartData: function(title) {
				var deferred = $q.defer();
				var promise = deferred.promise;

				deferred.resolve("Success!");

				return promise;
			},
			getCfdEndData: function(title) {
				var deferred = $q.defer();
				var promise = deferred.promise;

				deferred.resolve("Success!");

				return promise;	
			}
		}
	}));

	describe('cfdChartCtrl test 1', function(){

		beforeEach(inject(function($injector) { 
			$rootScope = $injector.get('$rootScope');
			var $controller = $injector.get('$controller');
			var $window = $injector.get('$window');

			$scope = $rootScope.$new();
			createController = function() { 
				return $controller('CfdChartCtrl', { '$scope': $scope, DataService: DataServiceMock, '$window': $window }); 
			};
		}));

		it('should parseData correctly', inject(function() {
			var controller = createController();
			var startDatesCsv = "\"Dec 9, 2013\",9\n"+
								"\"Dec 12, 2013\",1\n"+
								"\"Dec 13, 2013\",2\n"+
								"\"Dec 30, 2013\",1\n"+
								"\"Jan 7, 2014\",3\n"+
								"\"Jan 15, 2014\",1\n"+
								"\"Jan 22, 2014\",7\n"+
								"\"Jan 23, 2014\",2\n"+
								"\"Feb 4, 2014\",1\n"+
								"\"Feb 6, 2014\",1\n"+
								"\"Feb 10, 2014\",1\n"+
								"\"Mar 3, 2014\",1";

			var endDatesCsv = "\"Dec 11, 2013\",1\n"+
								"\"Dec 17, 2013\",1\n"+
								"\"Dec 20, 2013\",1\n"+
								"\"Dec 23, 2013\",1\n"+
								"\"Jan 2, 2014\",1\n"+
								"\"Jan 7, 2014\",1\n"+
								"\"Jan 10, 2014\",1\n"+
								"\"Jan 14, 2014\",1\n"+
								"\"Jan 16, 2014\",1\n"+
								"\"Jan 21, 2014\",1\n"+
								"\"Jan 22, 2014\",2\n"+
								"\"Jan 27, 2014\",2\n"+
								"\"Jan 30, 2014\",1\n"+
								"\"Feb 3, 2014\",3\n"+
								"\"Feb 4, 2014\",1\n"+
								"\"Feb 6, 2014\",3";


			var data = $scope.parseData(startDatesCsv, endDatesCsv);
			// console.log(data);
			// console.log(data.wipCount);
			// console.log(data.doneCount);
			// console.log(data.categories);
			
			expect(data.categories.length).toEqual(64);			
			expect(data.categories[0]).toEqual("Dec 9, 2013");
			expect(data.categories[1]).toEqual("Dec 10, 2013");
			expect(data.categories[2]).toEqual("Dec 11, 2013");
			expect(data.categories[3]).toEqual("Dec 12, 2013");
			expect(data.categories[4]).toEqual("Dec 13, 2013");
			expect(data.categories[5]).toEqual("Dec 14, 2013");
			expect(data.categories[62]).toEqual("Feb 09, 2014");
			expect(data.categories[63]).toEqual("Feb 10, 2014");

			expect(data.wipCount.length).toEqual(64);
			expect(data.wipCount[0]).toEqual(9);
			expect(data.wipCount[1]).toEqual(9);
			expect(data.wipCount[2]).toEqual(8);
			expect(data.wipCount[3]).toEqual(9);
			expect(data.wipCount[4]).toEqual(11);
			expect(data.wipCount[5]).toEqual(11);
			expect(data.wipCount[62]).toEqual(9);
			expect(data.wipCount[63]).toEqual(10);

			expect(data.doneCount.length).toEqual(64);
			expect(data.doneCount[0]).toEqual(0);
			expect(data.doneCount[1]).toEqual(0);
			expect(data.doneCount[2]).toEqual(1);
			expect(data.doneCount[3]).toEqual(1);
			expect(data.doneCount[4]).toEqual(1);
			expect(data.doneCount[5]).toEqual(1);
			expect(data.doneCount[62]).toEqual(19);
			expect(data.doneCount[63]).toEqual(19);
		}));

		it('should getTimeStamp correctly', inject(function() {
			var controller = createController();
			var date = "Dec 9, 2013";
			var actual = $scope.getTimestamp(date);
			expect(actual).toEqual(1386568800000);
		}));

		it('should getTimeStamp return null', inject(function() {
			var controller = createController();
			var actual = $scope.getTimestamp(null);
			expect(actual).toEqual(null);

			actual = $scope.getTimestamp("");
			expect(actual).toEqual(null);

			actual = $scope.getTimestamp(undefined);
			expect(actual).toEqual(null);
		}));

		it('should getDates return null', inject(function() {
			var controller = createController();
			var actual = $scope.getDates(null);
			expect(actual).toEqual(null);

			actual = $scope.getDates("");
			expect(actual).toEqual(null);

			actual = $scope.getDates(undefined);
			expect(actual).toEqual(null);
		}));

		it('should getDates correctly', inject(function() {
			var controller = createController();
			var date = "\"Dec 9, 2013\",9";
			var actual = $scope.getDates(date);
			expect(actual[0]).toEqual("Dec 9, 2013");
		}));

		it('should getDateFromArray return null', inject(function() {
			var controller = createController();
			var actual = $scope.getDateFromArray(null);
			expect(actual).toEqual(null);

			actual = $scope.getDateFromArray("");
			expect(actual).toEqual(null);

			actual = $scope.getDateFromArray(undefined);
			expect(actual).toEqual(null);
		}));

		it('should getDateFromArray correctly', inject(function() {
			var controller = createController();
			var date = ["\"Dec 9, 2013\",9"];
			var actual = $scope.getDateFromArray(date);
			expect(actual).toEqual("\"Dec 9, 2013\",9");
		}));

	});

});
