import 'bootstrap';

import angular from 'angular';
import helloWorldDirective from './directives/helloWorldDirective';
import jsapi from 'https://www.google.com/jsapi';

/**
 * Testing
 */
export default angular.module('main', [])
    .directive('helloWorld', helloWorldDirective);

