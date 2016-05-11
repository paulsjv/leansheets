import angular from 'angular';

export default () => {
    'ngInject';

    return class DomainUtils {

        static fields(DomainClass) {

            return Object.keys(DomainClass.$mapping)
                .filter((mapping) => !angular.isObject(DomainClass.$mapping[mapping]));

        }
        
        static children(DomainClass) {

            return Object.keys(DomainClass.$mapping)
                .filter((mapping) => angular.isObject(DomainClass.$mapping[mapping]));
            
        }
        
        static childFields(DomainClass, field) {

            return Object.keys(DomainClass.$mapping[field])
                .filter((mapping) => !angular.isObject(DomainClass.$mapping[mapping]));
            
        }

    };

};
