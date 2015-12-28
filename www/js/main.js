import 'bootstrap';

import angular from 'angular';
import helloWorldDirective from './directives/helloWorldDirective';
import HelloWorldController from './controllers/HelloWorldController';

export default angular.module('main', [])
    .directive('helloWorld', helloWorldDirective)
    .controller('helloWorldController', HelloWorldController);
