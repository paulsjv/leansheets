import angular from 'angular';
import loadScript from '../../../utils/loadScript';

const CALLBACK = 'loadGoogle';

export default (gApiKey, gClientId, gLoadApis, $window, $rootScope) => {
    'ngInject';

    return new Promise((resolve) => {

        $window[CALLBACK] = () => {
            $rootScope.$apply(() => {

                var apiPromises = [Promise.resolve($window.gapi.load('auth2'))];

                if (gApiKey) {
                    $window.gapi.client.setApiKey(gApiKey);
                }

                angular.forEach(gLoadApis, (version, name) => {
                    apiPromises.push(Promise.resolve($window.gapi.client.load(name, version)));
                });

                Promise.all(apiPromises).then(() => resolve($window.gapi));

            });
        };

        loadScript(`https://apis.google.com/js/api:client:platform.js?onload=${CALLBACK}`);

    });

};
