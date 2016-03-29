export default (layoutService) => {
    'ngInject';

    return {

        restrict: 'C',

        link: (scope, elem) => {

            elem.attr('class', layoutService.layout);

            scope.$watch(() => layoutService.layout, (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    elem.attr('class', layoutService.layout);
                }
            });

        }

    };

};
