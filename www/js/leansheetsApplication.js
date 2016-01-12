/**
 * The root of the module directory should only include only the angular module definition.
 *
 * Naming Convention:
 *
 * 1. Always include `ls-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always match the filename with the module folder name.
 *
 * i.e. ls-leansheetsApplication.js
 */
import ng from 'angular'; 
import applicationController from './controllers/applicationController';
import configService from './services/configService';
import dataService from './services/dataService';
import dataServiceFactory from './factories/dataServiceFactory';
import googleDataServiceFactory from './factories/googleDataServiceFactory';

export default ng.module('leansheetsApplication', ['config'])
					.config(['$logProvider','CONFIG', function($logProvider, config) {
						$logProvider.debugEnabled(config.debugEnabled);
					}])
					.controller('applicationController', applicationController)
					.service('configService', configService)
					.service('dataService', dataService)
                    .service('dataServiceFactory', dataServiceFactory)
                    .service('GoogleDataServiceFactory', googleDataServiceFactory);