import angular from 'angular';
import 'angular-mocks';

import 'www/js/modules/main/main';

describe('The helloWorldDirective', () => {

    let $scope,
        $compile,
        $timeout,
        $log;

    beforeEach(() => {

        angular.mock.module('main');

        inject((_$rootScope_, _$compile_, _$timeout_, _$log_) => {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $timeout = _$timeout_;
            $log = _$log_;
        });

    });

    it('should display the defined name', () => {

        let name = 'Some rendered text',
            $elem = $compile(`<hello-world data-name="{{ name }}"></hello-world>`)($scope);

        $scope.name = name;
        $scope.$digest();

        expect($elem.text()).toContain(`Hello ${name}`);

    });

});
