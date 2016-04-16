import angular from 'angular';

import 'angularfire';

import firebaseRef from './services/firebaseRef';
import settingsService from './services/settingsService';

export default angular.module('domain', ['firebase'])
    .constant('firebaseUrl', 'https://flickering-torch-9908.firebaseio.com')
    .service('firebaseRef', firebaseRef)
    .service('settingsService', settingsService);
