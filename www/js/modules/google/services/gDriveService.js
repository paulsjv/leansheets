export default class DriveService {

    constructor(gApi) {
        'ngInject';

        this.api = gApi;

    }

    get files() {

        var that = this;

        return {

            list: () => new Promise((resolve) => {

                that.api.then((google) => {

                    var request = google.client.drive.files.list({
                        'maxResults': 10
                    });

                    request.execute(function (resp) {

                        var files = resp.items;
                        if (files && files.length > 0) {
                            for (var i = 0; i < files.length; i++) {
                                var file = files[i];
                                console.log(file.title + ' (' + file.id + ')');
                            }
                        } else {
                            console.log('No files found.');
                        }

                        resolve(resp);

                    });

                });

            })

        };

    }

}
