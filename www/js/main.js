import 'bootstrap';

import angular from 'angular';
import helloWorldDirective from './directives/helloWorldDirective';
import helloWorldController from './controllers/helloWorldController';

export default angular.module('main', [])
    .directive('helloWorld', helloWorldDirective)
    .controller('helloWorldController', helloWorldController);
