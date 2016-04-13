import angular from 'angular';

import firebaseRef from './services/firebaseRef';

export default angular.module('domain', [])
    .constant('firebaseUrl', 'https://flickering-torch-9908.firebaseio.com')
    .service('firebaseRef', firebaseRef);
