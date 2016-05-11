import angular from 'angular';

export default ($log, $rootScope, $window) => {
    'ngInject';

    angular.element($window).on('resize', () => {
        $rootScope.$broadcast('$resize')
    });

};
