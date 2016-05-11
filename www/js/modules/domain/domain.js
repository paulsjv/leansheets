import angular from 'angular';

import 'angular-ui-router';
import 'angularfire';

import '../../modules/inflect/inflect';

import clearableInput from './components/clearableInput';

import DomainUtils from './factories/DomainUtils';
import firebaseRef from './factories/firebaseRef';
import User from './factories/User';

import pages from './filters/pages';
import paginate from './filters/paginate';
import sort from './filters/sort';

import $scaffold from './provider/$scaffold';

export default angular.module('ls.domain', ['ls.inflect', 'ui.router', 'firebase'])
    .constant('FIREBASE_URL', 'https://flickering-torch-9908.firebaseio.com')
    .component('clearableInput', clearableInput)
    .factory('DomainUtils', DomainUtils)
    .factory('firebaseRef', firebaseRef)
    .factory('User', User)
    .filter('pages', pages)
    .filter('paginate', paginate)
    .filter('sort', sort)
    .provider('$scaffold', $scaffold);
