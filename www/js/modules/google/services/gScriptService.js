export default class gScriptService {

    constructor(g, gScripts) {
        'ngInject';

        this.g = g;
        this.gScripts = gScripts;

    }

    exec(scriptId, request) {

        return new Promise((resolve, reject) => {

            this.g.then((gapi) => {

                gapi.client.request({
                    'root': 'https://script.googleapis.com',
                    'path': 'v1/scripts/' + scriptId + ':run',
                    'method': 'POST',
                    'body': request
                }).execute((resp) => {

                    if (resp.error) {
                        reject(resp);
                    } else {
                        resolve(resp);
                    }

                });

            });

        });

    }

}
