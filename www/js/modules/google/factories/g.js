import angular from 'angular';
import loadScript from '../../../utils/loadScript';

const CALLBACK = 'loadGoogle';

export default ($log, gModules, gLoadApis, gClientLoadApis, gClientId, gScopes, $window) => {
    'ngInject';

    return new Promise((resolve, reject) => {

        $window[CALLBACK] = () => {

            var apiPromises = [];

            angular.forEach(gLoadApis, (name) => {
                apiPromises.push($window.gapi.load(name));
            });

            angular.forEach(gClientLoadApis, (version, name) => {
                apiPromises.push($window.gapi.client.load(name, version));
            });

            Promise.all(apiPromises).then(() => resolve($window.gapi), reject);

        };

        loadScript(`https://apis.google.com/js/${gModules.join(':')}.js?onload=${CALLBACK}`);

    }).then((gapi) => {

        return new Promise((resolve, reject) => {

            if (gapi.auth2) {

                gapi.auth2.init({
                    client_id: gClientId,
                    scope: gScopes.join(' '),
                    cookiepolicy: 'single_host_origin'
                }).then(() => {
                    resolve(gapi);
                });

            } else {
                reject('g.js: auth2 module not loaded.');
            }

        });

    });

};
