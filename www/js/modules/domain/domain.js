import angular from 'angular';

import 'angularfire';

import firebaseRef from './factories/firebaseRef';
import User from './factories/User';

export default angular.module('domain', ['firebase'])
    .constant('FIREBASE_URL', 'https://flickering-torch-9908.firebaseio.com')
    .factory('firebaseRef', firebaseRef)
    .factory('User', User);
