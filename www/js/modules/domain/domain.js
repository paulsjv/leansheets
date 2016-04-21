import angular from 'angular';

import 'angular-ui-router';
import 'angularfire';

import firebaseRef from './factories/firebaseRef';
import User from './factories/User';
import $scaffold from './provider/$scaffold';

export default angular.module('domain', ['ui.router', 'firebase'])
    .constant('FIREBASE_URL', 'https://flickering-torch-9908.firebaseio.com')
    .factory('firebaseRef', firebaseRef)
    .factory('User', User)
    .provider('$scaffold', $scaffold);
