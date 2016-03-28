import angular from 'angular';

import files from './directives/files';
import loginButton from './directives/gLoginButton';
import meta from './directives/gMeta';
import api from './factories/gApi';
import driveService from './services/gDriveService';
import userService from './services/gUserService';

export default angular.module('google', [])
    .constant('gApplicationId', '834306803658')
    .constant('gApiKey', null)
    .constant('gClientId', '834306803658-pbrj1t1lur7eq6nacauqanljjsan0i0n.apps.googleusercontent.com')
    .constant('gClientSecret', 'UfY5f96OwV8eXk2Ma2Px0qMz')
    .constant('gLoadApis', {
        'drive' : 'v2'
    })
    .constant('gScopes', [
        'email',
        'profile',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.file'
    ])
    .directive('files', files)
    .directive('gLoginButton', loginButton)
    .directive('gMeta', meta)
    .factory('gApi', api)
    .service('gDriveService', driveService)
    .service('gUserService', userService);
