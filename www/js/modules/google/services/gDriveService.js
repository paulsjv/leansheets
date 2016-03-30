export default class DriveService {

    constructor(g) {
        'ngInject';

        this.g = g;

    }

    get files() {

        var that = this;

        return {

            list: () => new Promise((resolve) => {

                that.g.then((api) => {

                    var request = api.client.drive.files.list({
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
