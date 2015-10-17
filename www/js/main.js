import 'bootstrap';

import angular from 'angular';
import helloWorldDirective from './directives/helloWorldDirective';

/**
 * Testing
 */
export default angular.module('main', [])
    .directive('helloWorld', helloWorldDirective);
