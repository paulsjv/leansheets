import 'bootstrap';

import angular from 'angular';

import '../partials/partials';

import helloWorld from './directives/helloWorld';
import navigation from './directives/navigation';
import HelloWorldController from './controllers/HelloWorldController';

export default angular.module('main', ['app.partials'])
    .directive('helloWorld', helloWorld)
    .directive('navigation', navigation)
    .controller('helloWorldController', HelloWorldController);
