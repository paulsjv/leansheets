import angular from 'angular';
import loadScript from '../../../utils/loadScript';

const CALLBACK = 'loadGoogle';

export default ($log, gModules, gLoadApis, gClientLoadApis, gClientId, gScopes, $window, $rootScope) => {
    'ngInject';

    var gPromise = new Promise((resolve) => {

        $window[CALLBACK] = () => {
            $rootScope.$apply(() => {

                var apiPromises = [];

                angular.forEach(gLoadApis, (name) => {
                    apiPromises.push(Promise.resolve($window.gapi.load(name)));
                });

                angular.forEach(gClientLoadApis, (version, name) => {
                    apiPromises.push(Promise.resolve($window.gapi.client.load(name, version)));
                });

                Promise.all(apiPromises).then(() => resolve($window.gapi));

            });
        };

        loadScript(`https://apis.google.com/js/${gModules.join(':')}.js?onload=${CALLBACK}`);

    });

    gPromise.then((g) => {

        if (g.auth2) {

            g.auth2.init({
                client_id: gClientId,
                scope: gScopes.join(' ')
            });

            $log.debug('gapi.auth2 initialized.');

        }

    });

    return gPromise;

};
