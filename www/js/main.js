import 'bootstrap';

import angular from 'angular';
import helloWorldDirective from './directives/helloWorldDirective';
import google from './async/google';

/**
 * Testing
 */
export default angular.module('main', [])
    .directive('helloWorld', helloWorldDirective);

// This corresponds with the promise you resolved in www/js/async/google.js
google.then(($google) => {
    console.log('Bootstraping Application');
    console.log($google);
});
