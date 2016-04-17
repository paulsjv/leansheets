import angular from 'angular';

import g from './factories/g';
import gAuthFactory from './factories/gAuthFactory';
import gAuthResponseFactory from './factories/gAuthResponseFactory';
import gBasicProfileFactory from './factories/gBasicProfileFactory';
import gUserFactory from './factories/gUserFactory';

import authService from './services/gAuthService';
import scriptService from './services/gScriptService';

export default angular.module('google', [])
    .constant('gClientId', '138745799930-6liem3jdh7f9n2e7dnrdbenfu7en1q31.apps.googleusercontent.com')
    .constant('gModules', [
        'client'
    ])
    .constant('gLoadApis', [
        'auth2'
    ])
    .constant('gClientLoadApis', {
        'drive': 'v3'
    })
    .constant('gScopes', [
        'profile',
        'https://www.googleapis.com/auth/script.external_request',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.appfolder',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.metadata',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.scripts'
    ])
    .constant('gScripts', {
        LS_DATA_DEV: 'MzA0CROwlXMIvJMrE-vp8hHFIFWf3Dj_9'
    })
    .factory('g', g)
    .factory('gAuthFactory', gAuthFactory)
    .factory('gAuthResponseFactory', gAuthResponseFactory)
    .factory('gBasicProfileFactory', gBasicProfileFactory)
    .factory('gUserFactory', gUserFactory)
    .service('gAuthService', authService)
    .service('gScriptService', scriptService);
