'use strict';

/* jasmine specs for controllers go here */

describe('histogramChartCtrl Tests', function(){
  
  	// add matcher
	beforeEach(function() {
		this.addMatchers({
			toEqualData: function(expected){
				return angular.equals(this.actual, expected);
			}
		});
	});

	// add global variables
	var $scope, $rootScope, $q, DataServiceMock, createController;

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
			}
		}
	}));

	describe('histogramChartCtrl test 1', function(){

		beforeEach(inject(function($injector) { 
			$rootScope = $injector.get('$rootScope');
			var $controller = $injector.get('$controller');

			$scope = $rootScope.$new();
			createController = function() { 
				return $controller('HistogramChartCtrl', { '$scope': $scope, DataService: DataServiceMock }); 
			};
		}));

		it('should ....', inject(function() {
			var controller = createController();
			var csv = "12/11/2013,1,156787,AD MIB in Spectrum\n"+
					  "12/17/2013,3,158967,Remaster 9.2.0 Anomaly Detector\n"+
					  "12/20/2013,8,157889,Docs - Archive 9.2.0 Documentation & Start 9.3.0 Documentation\n"+
					  "12/23/2013,9,151176,Flow Cloner Destination Port\n"+
					  "1/2/2014,17,157858,Bundle Java 1.6.45 with all Installers\n"+
					  "1/7/2014,20,158769,SPIKE - get the new MySQL 5.6 source building on Linux\n"+
					  "1/7/2014,20,158769,SPIKE - get the new MySQL 5.6 source building on Linux\n"+
					  "1/7/2014,20,158769,SPIKE - get the new MySQL 5.6 source building on Linux\n"+
					  "1/10/2014,4,167094,Get the example storage engine up and running with MySQL 5.6\n"+
					  "1/10/2014,10,131792,DOCS: Add documentation for the Available Interfaces page\n"+
					  "1/9/2014,8,165739,DOCS: Reorganize Admin Guide to accommodate additions\n";


			var data = $scope.parseData(csv);

			expect(data.categories.length).toEqual(8);
			expect(data.categories[0]).toEqual(1);
			expect(data.categories[1]).toEqual(3);
			expect(data.categories[2]).toEqual(4);
			expect(data.categories[3]).toEqual(8);
			expect(data.categories[4]).toEqual(9);
			expect(data.categories[5]).toEqual(10);
			expect(data.categories[6]).toEqual(17);
			expect(data.categories[7]).toEqual(20);

			expect(data.frequency.length).toEqual(8);
			expect(data.frequency[0]).toEqual(1);
			expect(data.frequency[1]).toEqual(1);
			expect(data.frequency[2]).toEqual(1);
			expect(data.frequency[3]).toEqual(2);
			expect(data.frequency[4]).toEqual(1);
			expect(data.frequency[5]).toEqual(1);
			expect(data.frequency[6]).toEqual(1);
			expect(data.frequency[7]).toEqual(3);
		}));

	});

});
