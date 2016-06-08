import angular from 'angular';

import camelize from './filters/camelize';
import capitalize from './filters/capitalize';
import dasherize from './filters/dasherize';
import decapitalize from './filters/decapitalize';
import humanize from './filters/humanize';
import parameterize from './filters/parameterize';
import pluarlize from './filters/pluarlize';
import singularize from './filters/singularize';
import titleize from './filters/titleize';
import underscore from './filters/underscore';

export default angular.module('inflect', [])
    .filter('camelize', camelize)
    .filter('capitalize', capitalize)
    .filter('dasherize', dasherize)
    .filter('decapitalize', decapitalize)
    .filter('humanize', humanize)
    .filter('parameterize', parameterize)
    .filter('pluralize', pluarlize)
    .filter('singularize', singularize)
    .filter('titleize', titleize)
    .filter('underscore', underscore);
