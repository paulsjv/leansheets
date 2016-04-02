export default class gScriptService {

    constructor(g, gScripts, $q) {
        'ngInject';

        this.g = g;
        this.gScripts = gScripts;
        this.$q = $q;

    }

    exec(scriptId, request) {

        return this.$q((resolve, reject) => {

            this.g.then((gapi) => {

                gapi.client.request({
                    'root': 'https://script.googleapis.com',
                    'path': 'v1/scripts/' + scriptId + ':run',
                    'method': 'POST',
                    'body': request
                }).execute((response) => {

                    if (response.error) {
                        reject(response);
                    } else {
                        resolve(response);
                    }

                });

            });

        });

    }

}
