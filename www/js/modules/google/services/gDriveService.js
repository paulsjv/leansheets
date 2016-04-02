export default class gDriveService {

    constructor(gScriptService, gScripts, $q) {
        'ngInject';

        this.gScriptService = gScriptService;
        this.gScripts = gScripts;
        this.$q = $q;

    }

    get files() {

        var that = this;

        return {

            list: () => that.$q((resolve, reject) => {

                that.gScriptService.exec(that.gScripts.LS_DATA_DEV, {
                    function: 'listSpreadsheets',
                    parameters: [
                        'reqParam'
                    ]
                }).then((response) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });

            })

        };

    }

}
